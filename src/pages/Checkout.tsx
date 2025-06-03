
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AddressManager from '@/components/AddressManager';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { CreditCard, Smartphone, Building, Truck, Gift, Percent, Shield, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  type: 'home' | 'work';
  isDefault: boolean;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountApplied, setDiscountApplied] = useState(false);

  const deliveryFee = 0;
  const platformFee = 0;
  const handlingFee = 0;
  const discount = discountApplied ? Math.round(totalPrice * 0.1) : 0;
  const couponDiscount = appliedCoupon ? 50 : 0;
  const finalTotal = Math.max(0, totalPrice + deliveryFee + platformFee + handlingFee - discount - couponDiscount);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleCouponApply = () => {
    const validCoupons = ['SAVE10', 'FIRST20', 'UPI10', 'WELCOME50'];
    if (validCoupons.includes(couponCode.toUpperCase())) {
      setAppliedCoupon(couponCode.toUpperCase());
      toast({
        title: "Coupon Applied!",
        description: `You saved ₹${couponCode.toUpperCase() === 'WELCOME50' ? 50 : 20} with coupon ${couponCode.toUpperCase()}`,
      });
    } else {
      toast({
        title: "Invalid Coupon",
        description: "Please enter a valid coupon code",
        variant: "destructive",
      });
    }
  };

  const handlePayment = () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to place an order",
        variant: "destructive",
      });
      navigate('/auth', { state: { returnTo: '/checkout' } });
      return;
    }

    if (!selectedAddress) {
      toast({
        title: "Add delivery address",
        description: "Please add or select a delivery address",
        variant: "destructive",
      });
      return;
    }

    if (!paymentMethod) {
      toast({
        title: "Select payment method",
        description: "Please select a payment method to continue",
        variant: "destructive",
      });
      return;
    }

    // Validate payment method specific fields
    if (paymentMethod === 'upi' && !upiId) {
      toast({
        title: "Enter UPI ID",
        description: "Please enter your UPI ID",
        variant: "destructive",
      });
      return;
    }

    if ((paymentMethod === 'card') && (!cardNumber || !expiryDate || !cvv || !nameOnCard)) {
      toast({
        title: "Complete card details",
        description: "Please fill in all card details",
        variant: "destructive",
      });
      return;
    }

    // Create order details
    const orderDetails = {
      orderNumber: '#AG' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddress: selectedAddress,
      paymentSummary: {
        subtotal: totalPrice,
        delivery: deliveryFee,
        discount: discount + couponDiscount,
        total: finalTotal
      }
    };

    // Simulate payment processing
    toast({
      title: "Order placed successfully!",
      description: `Your order has been placed using ${paymentMethod.toUpperCase()}`,
    });

    clearCart();
    navigate('/order-confirmation', { state: { orderDetails } });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some products to continue</p>
          <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Complete Payment</h1>
          <div className="flex items-center text-green-600">
            <Shield className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">100% Secure</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Address and Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">1. Delivery Address</CardTitle>
              </CardHeader>
              <CardContent>
                <AddressManager 
                  onAddressSelect={handleAddressSelect}
                  selectedAddressId={selectedAddress?.id}
                />
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">2. Choose Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  {/* UPI Payment */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="upi" id="upi" />
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-6 w-6 text-blue-600" />
                          <div>
                            <Label htmlFor="upi" className="text-base font-medium cursor-pointer">UPI</Label>
                            <p className="text-sm text-gray-600">Pay by any UPI app</p>
                          </div>
                        </div>
                        <span className="text-green-600 text-sm font-medium flex items-center">
                          <Percent className="h-4 w-4 mr-1" />
                          10% Off
                        </span>
                      </div>
                    </div>
                    {paymentMethod === 'upi' && (
                      <div className="mt-4 pl-8">
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Enter your UPI ID"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="flex-1"
                          />
                          <Button variant="outline" size="sm">Verify</Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          You need to have a registered account with any UPI app like Paytm, Google Pay, PhonePe
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Credit/Debit Card */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="card" id="card" />
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-6 w-6 text-green-600" />
                        <div>
                          <Label htmlFor="card" className="text-base font-medium cursor-pointer">Credit / Debit / ATM Card</Label>
                          <p className="text-sm text-gray-600">Add and secure cards as per RBI guidelines</p>
                          <p className="text-sm text-green-600">5% Unlimited Cashback on AgriCaptain Axis Bank Credit Card</p>
                        </div>
                      </div>
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="mt-4 pl-8 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm">Card Number</Label>
                            <Input
                              placeholder="Enter Card Number"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Name on Card</Label>
                            <Input
                              placeholder="Enter Name on Card"
                              value={nameOnCard}
                              onChange={(e) => setNameOnCard(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Valid Thru</Label>
                            <Input
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label className="text-sm">CVV</Label>
                            <Input
                              placeholder="CVV"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* EMI */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="emi" id="emi" />
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-6 w-6 text-orange-600" />
                        <div>
                          <Label htmlFor="emi" className="text-base font-medium cursor-pointer">EMI</Label>
                          <p className="text-sm text-gray-600">Get Debit and Cardless EMIs on HDFC Bank, SBI, ICICI Bank</p>
                          <p className="text-sm text-blue-600">Starting from ₹833/month</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Net Banking */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <div className="flex items-center space-x-3">
                        <Building className="h-6 w-6 text-blue-700" />
                        <div>
                          <Label htmlFor="netbanking" className="text-base font-medium cursor-pointer">Net Banking</Label>
                          <p className="text-sm text-gray-600">All major banks supported</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cash on Delivery */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="cod" id="cod" />
                      <div className="flex items-center space-x-3">
                        <Truck className="h-6 w-6 text-yellow-600" />
                        <div>
                          <Label htmlFor="cod" className="text-base font-medium cursor-pointer">Cash on Delivery</Label>
                          <p className="text-sm text-orange-600">
                            💡 Complete payment before delivery and get 10% discount!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-4">
            {/* Coupon Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-green-600" />
                  Coupons & Offers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" onClick={handleCouponApply}>Apply</Button>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <p className="text-green-800 text-sm font-medium">✓ {appliedCoupon} applied</p>
                      <p className="text-green-600 text-xs">You saved ₹{couponDiscount}</p>
                    </div>
                  )}
                  
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">Available Coupons:</p>
                    <div className="space-y-1 text-gray-600">
                      <p>• SAVE10 - ₹20 off on orders above ₹500</p>
                      <p>• FIRST20 - ₹50 off for first time buyers</p>
                      <p>• WELCOME50 - ₹50 off (Limited time)</p>
                      <p>• UPI10 - Extra 10% off with UPI payment</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Price Details</span>
                  <span className="text-sm font-normal">({items.length} item{items.length > 1 ? 's' : ''})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Delivery Charges</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Platform Fee</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Handling Charges</span>
                  <span>Free</span>
                </div>
                {paymentMethod === 'upi' && (
                  <div className="flex justify-between text-green-600">
                    <span>UPI Discount (10%)</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span>-₹{couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>
                
                {/* Flipkart-style Pay Button */}
                <div className="mt-6">
                  <Button 
                    onClick={handlePayment} 
                    className="w-full h-12 text-base font-medium bg-orange-500 hover:bg-orange-600 text-white"
                    disabled={!paymentMethod || !selectedAddress}
                  >
                    PAY ₹{finalTotal.toFixed(0)}
                  </Button>
                  {(!paymentMethod || !selectedAddress) && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      {!selectedAddress ? 'Please select delivery address' : 'Please select payment method'}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 5% Cashback Offer */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-green-800 font-medium text-sm">5% Cashback</p>
                  <p className="text-green-700 text-xs">Claim now with payment offers</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
