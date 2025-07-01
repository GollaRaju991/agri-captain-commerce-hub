
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { CreditCard, Smartphone, Building, Truck, Gift, Percent, Shield, Tag, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import useScrollToTop from '@/hooks/useScrollToTop';
import { supabase } from '@/integrations/supabase/client';
import { dualBackendService } from '@/services/dualBackendService';

// Use the same Address interface as AddressManager
interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  address_type: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, totalPrice, clearCart } = useCart();
  const { user, redirectAfterLogin, setRedirectAfterLogin } = useAuth();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressesLoading, setAddressesLoading] = useState(true);
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedEMI, setSelectedEMI] = useState('');

  const deliveryFee = 0;
  const platformFee = 0;
  const handlingFee = 0;
  
  // UPI discount only when UPI is selected and UPI ID is provided
  const upiDiscount = (paymentMethod === 'upi' && upiId.trim()) ? Math.round(totalPrice * 0.1) : 0;
  const couponDiscount = appliedCoupon === 'WELCOME50' ? 50 : appliedCoupon === 'SAVE10' ? 20 : appliedCoupon === 'FIRST20' ? 20 : 0;
  const finalTotal = Math.max(0, totalPrice + deliveryFee + platformFee + handlingFee - upiDiscount - couponDiscount);

  // Scroll to top when component mounts
  useScrollToTop();

  // Set redirect path when user comes to checkout without being logged in
  useEffect(() => {
    if (!user && location.pathname === '/checkout') {
      setRedirectAfterLogin('/checkout');
    }
  }, [user, location.pathname, setRedirectAfterLogin]);

  // Load addresses when user is available
  useEffect(() => {
    const loadAddresses = async () => {
      if (!user) {
        setAddressesLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('addresses')
          .select('*')
          .eq('user_id', user.id)
          .order('is_default', { ascending: false })
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error loading addresses:', error);
          toast({
            title: "Error loading addresses",
            description: "Please try again or add a new address",
            variant: "destructive",
          });
        } else {
          setAddresses(data || []);
          // Auto-select default address or first available address
          const defaultAddress = data?.find(addr => addr.is_default) || data?.[0];
          if (defaultAddress) {
            setSelectedAddress(defaultAddress);
          }
        }
      } catch (error) {
        console.error('Error loading addresses:', error);
      } finally {
        setAddressesLoading(false);
      }
    };

    loadAddresses();
  }, [user, toast]);

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

  const saveOrderToDatabase = async (orderDetails: any) => {
    try {
      // Use dual backend service for better reliability
      const dualOrderData = {
        orderId: orderDetails.orderNumber,
        userId: user?.id || '',
        customerData: {
          name: user?.name || '',
          email: user?.email || '',
          phone: user?.phone || ''
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: finalTotal,
        paymentMethod: paymentMethod,
        address: selectedAddress
      };

      const result = await dualBackendService.saveOrderDual(dualOrderData);
      
      if (!result.success) {
        throw new Error(result.error);
      }

      return { success: true };
    } catch (error) {
      console.error('Error saving order:', error);
      throw error;
    }
  };

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to place an order",
        variant: "destructive",
      });
      setRedirectAfterLogin('/checkout');
      navigate('/auth');
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

    if (paymentMethod === 'netbanking' && !selectedBank) {
      toast({
        title: "Select Bank",
        description: "Please select your bank for Net Banking",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === 'emi' && !selectedEMI) {
      toast({
        title: "Select EMI Option",
        description: "Please select an EMI option",
        variant: "destructive",
      });
      return;
    }

    try {
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
          discount: upiDiscount + couponDiscount,
          total: finalTotal
        }
      };

      // Save order to database
      await saveOrderToDatabase(orderDetails);

      // Simulate payment processing
      toast({
        title: "Order placed successfully!",
        description: `Your order has been placed using ${paymentMethod.toUpperCase()}`,
      });

      clearCart();
      navigate('/order-confirmation', { state: { orderDetails } });
    } catch (error) {
      console.error('Error processing order:', error);
      toast({
        title: "Order failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
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
      
      <div className="max-w-7xl mx-auto px-4 py-8">
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
                {addressesLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading addresses...</p>
                  </div>
                ) : addresses.length > 0 ? (
                  <div className="space-y-4">
                    <RadioGroup 
                      value={selectedAddress?.id || ''} 
                      onValueChange={(value) => {
                        const address = addresses.find(addr => addr.id === value);
                        if (address) handleAddressSelect(address);
                      }}
                    >
                      {addresses.map((address) => (
                        <div key={address.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor={address.id} className="cursor-pointer">
                              <div className="font-medium">{address.name}</div>
                              <div className="text-sm text-gray-600">{address.phone}</div>
                              <div className="text-sm text-gray-600 mt-1">
                                {address.address}, {address.city}, {address.state} - {address.pincode}
                              </div>
                              <div className="text-xs text-gray-500 mt-1 capitalize">
                                {address.address_type}
                                {address.is_default && <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded">Default</span>}
                              </div>
                            </Label>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                    <AddressManager 
                      onAddressSelect={handleAddressSelect}
                      selectedAddressId={selectedAddress?.id}
                    />
                  </div>
                ) : (
                  <AddressManager 
                    onAddressSelect={handleAddressSelect}
                    selectedAddressId={selectedAddress?.id}
                  />
                )}
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">2. Choose Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mr-3">4</div>
                  <div>
                    <p className="text-sm font-medium">PAYMENT OPTIONS</p>
                    <div className="flex items-center text-xs text-gray-600 mt-1">
                      <span className="mr-2">Complete payment in</span>
                      <div className="bg-white px-2 py-1 rounded border">00:10:39</div>
                    </div>
                  </div>
                </div>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-1">
                  {/* UPI Payment */}
                  <div className="border-l-4 border-transparent data-[state=checked]:border-blue-600">
                    <div className="flex items-start space-x-3 p-4 bg-white hover:bg-gray-50">
                      <RadioGroupItem value="upi" id="upi" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <Smartphone className="h-5 w-5 text-orange-500" />
                          <Label htmlFor="upi" className="text-base font-medium cursor-pointer">UPI</Label>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Pay by any UPI app</p>
                        {paymentMethod === 'upi' && (
                          <div className="mt-4 space-y-3 border-t pt-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="upi-id" id="upi-id" />
                              <Label htmlFor="upi-id" className="text-sm font-medium">Your UPI ID</Label>
                            </div>
                            <div className="flex space-x-2 ml-6">
                              <Input
                                placeholder="Enter UPI ID"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                className="flex-1"
                              />
                              <Button variant="outline" size="sm" className="text-blue-600">VERIFY</Button>
                              <Button size="sm" className="bg-gray-600 hover:bg-gray-700">PAY ₹{finalTotal}</Button>
                            </div>
                            <p className="text-xs text-gray-500 ml-6">
                              You need to have a registered account with any UPI app like Paytm, Google Pay, PhonePe
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Credit/Debit Card */}
                  <div className="border-l-4 border-transparent data-[state=checked]:border-blue-600">
                    <div className="flex items-start space-x-3 p-4 bg-white hover:bg-gray-50">
                      <RadioGroupItem value="card" id="card" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <CreditCard className="h-5 w-5 text-gray-600" />
                          <Label htmlFor="card" className="text-base font-medium cursor-pointer">Credit / Debit / ATM Card</Label>
                        </div>
                        <p className="text-sm text-gray-600">Add and secure cards as per RBI guidelines</p>
                        {paymentMethod === 'card' && (
                          <div className="mt-4 space-y-4 border-t pt-4">
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
                    </div>
                  </div>

                  {/* Net Banking */}
                  <div className="border-l-4 border-transparent data-[state=checked]:border-blue-600">
                    <div className="flex items-start space-x-3 p-4 bg-white hover:bg-gray-50">
                      <RadioGroupItem value="netbanking" id="netbanking" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <Building className="h-5 w-5 text-blue-600" />
                          <Label htmlFor="netbanking" className="text-base font-medium cursor-pointer">Net Banking</Label>
                        </div>
                        <p className="text-sm text-gray-600">This instrument has low success, use UPI or cards for better experience</p>
                        {paymentMethod === 'netbanking' && (
                          <div className="mt-4 border-t pt-4">
                            <Label className="text-sm">Select Your Bank</Label>
                            <select 
                              value={selectedBank} 
                              onChange={(e) => setSelectedBank(e.target.value)}
                              className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Choose Bank</option>
                              <option value="sbi">State Bank of India</option>
                              <option value="hdfc">HDFC Bank</option>
                              <option value="icici">ICICI Bank</option>
                              <option value="axis">Axis Bank</option>
                              <option value="pnb">Punjab National Bank</option>
                              <option value="bob">Bank of Baroda</option>
                              <option value="other">Other Banks</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* EMI */}
                  <div className="border-l-4 border-transparent data-[state=checked]:border-blue-600">
                    <div className="flex items-start space-x-3 p-4 bg-white hover:bg-gray-50">
                      <RadioGroupItem value="emi" id="emi" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <CreditCard className="h-5 w-5 text-purple-600" />
                          <Label htmlFor="emi" className="text-base font-medium cursor-pointer">EMI (Easy Installments)</Label>
                        </div>
                        <p className="text-sm text-gray-600">Get Debit and Cardless EMIs on HDFC Bank, SBI, ICICI Bank</p>
                        {paymentMethod === 'emi' && (
                          <div className="mt-4 space-y-3 border-t pt-4">
                            <RadioGroup value={selectedEMI} onValueChange={setSelectedEMI}>
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="3months" id="3months" />
                                  <Label htmlFor="3months" className="text-sm">3 Months - ₹{Math.ceil(finalTotal/3)}/month</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="6months" id="6months" />
                                  <Label htmlFor="6months" className="text-sm">6 Months - ₹{Math.ceil(finalTotal/6)}/month</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="12months" id="12months" />
                                  <Label htmlFor="12months" className="text-sm">12 Months - ₹{Math.ceil(finalTotal/12)}/month</Label>
                                </div>
                              </div>
                            </RadioGroup>
                          </div>
                        )}
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
                      <p>• FIRST20 - ₹20 off for first time buyers</p>
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
                  <span>PRICE DETAILS</span>
                  <span className="text-sm font-normal">({items.length} item{items.length > 1 ? 's' : ''})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Price ({items.length} item{items.length > 1 ? 's' : ''})</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Delivery Charges</span>
                  <span>₹0 Free</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Packaging Charges</span>
                  <span>₹0 Free</span>
                </div>
                {upiDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>UPI Discount (10%)</span>
                    <span>-₹{upiDiscount.toFixed(2)}</span>
                  </div>
                )}
                {appliedCoupon && couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span>-₹{couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Amount Payable</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>
                
                {/* Pay Button */}
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

            {/* Safe Payments Info */}
            <Card className="bg-gray-50">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">Safe and Secure Payments. Easy returns.</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">100% Authentic products.</p>
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
