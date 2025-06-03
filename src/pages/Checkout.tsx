
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { CreditCard, Smartphone, Building, Truck, Gift, Percent } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import UPIPaymentConfirmation from '@/components/UPIPaymentConfirmation';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [showUPIConfirmation, setShowUPIConfirmation] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);

  const deliveryFee = 50;
  const discount = discountApplied ? Math.round(total * 0.1) : 0;
  const finalTotal = total + deliveryFee - discount;

  const handleUPIConfirmation = (confirmed: boolean) => {
    setShowUPIConfirmation(false);
    if (confirmed) {
      setDiscountApplied(true);
      setPaymentMethod('upi');
    }
  };

  const handlePayment = () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to place an order",
        variant: "destructive",
      });
      navigate('/auth');
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

    if ((paymentMethod === 'credit' || paymentMethod === 'debit') && (!cardNumber || !expiryDate || !cvv || !nameOnCard)) {
      toast({
        title: "Complete card details",
        description: "Please fill in all card details",
        variant: "destructive",
      });
      return;
    }

    // Simulate payment processing
    toast({
      title: "Order placed successfully!",
      description: `Your order has been placed using ${paymentMethod.toUpperCase()}`,
    });

    clearCart();
    navigate('/profile');
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
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {/* UPI Payment */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center space-x-2 cursor-pointer">
                        <Smartphone className="h-5 w-5 text-blue-600" />
                        <span>UPI Payment</span>
                        {discountApplied && (
                          <span className="text-green-600 text-sm font-medium flex items-center">
                            <Percent className="h-4 w-4 mr-1" />
                            10% Discount Applied
                          </span>
                        )}
                      </Label>
                    </div>
                    {paymentMethod === 'upi' && (
                      <div className="ml-6 space-y-2">
                        <Label htmlFor="upi-id">UPI ID</Label>
                        <Input
                          id="upi-id"
                          placeholder="Enter your UPI ID (e.g., name@paytm)"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                        />
                        <p className="text-sm text-gray-600">Supports PhonePe, Google Pay, Paytm, and other UPI apps</p>
                      </div>
                    )}
                  </div>

                  {/* Credit Card */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit" id="credit" />
                      <Label htmlFor="credit" className="flex items-center space-x-2 cursor-pointer">
                        <CreditCard className="h-5 w-5 text-green-600" />
                        <span>Credit Card</span>
                      </Label>
                    </div>
                    {paymentMethod === 'credit' && (
                      <div className="ml-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="card-name">Name on Card</Label>
                            <Input
                              id="card-name"
                              placeholder="Full Name"
                              value={nameOnCard}
                              onChange={(e) => setNameOnCard(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input
                              id="card-number"
                              placeholder="1234 5678 9012 3456"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Debit Card */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="debit" id="debit" />
                      <Label htmlFor="debit" className="flex items-center space-x-2 cursor-pointer">
                        <CreditCard className="h-5 w-5 text-purple-600" />
                        <span>Debit Card</span>
                      </Label>
                    </div>
                    {paymentMethod === 'debit' && (
                      <div className="ml-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="debit-name">Name on Card</Label>
                            <Input
                              id="debit-name"
                              placeholder="Full Name"
                              value={nameOnCard}
                              onChange={(e) => setNameOnCard(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="debit-number">Card Number</Label>
                            <Input
                              id="debit-number"
                              placeholder="1234 5678 9012 3456"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="debit-expiry">Expiry Date</Label>
                            <Input
                              id="debit-expiry"
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="debit-cvv">CVV</Label>
                            <Input
                              id="debit-cvv"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* EMI */}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="emi" id="emi" />
                    <Label htmlFor="emi" className="flex items-center space-x-2 cursor-pointer">
                      <CreditCard className="h-5 w-5 text-orange-600" />
                      <span>EMI (Easy Monthly Installments)</span>
                    </Label>
                  </div>

                  {/* Net Banking */}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Label htmlFor="netbanking" className="flex items-center space-x-2 cursor-pointer">
                      <Building className="h-5 w-5 text-blue-700" />
                      <span>Net Banking</span>
                    </Label>
                  </div>

                  {/* Cash on Delivery */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex items-center space-x-2 cursor-pointer">
                        <Truck className="h-5 w-5 text-yellow-600" />
                        <span>Cash on Delivery</span>
                      </Label>
                    </div>
                    <p className="ml-6 text-sm text-orange-600">
                      💡 Complete payment before delivery and get 10% discount!
                    </p>
                  </div>
                </RadioGroup>

                {/* UPI Discount Offer */}
                {!discountApplied && paymentMethod !== 'upi' && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Gift className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Special UPI Offer!</span>
                    </div>
                    <p className="text-sm text-green-700 mb-3">
                      Pay with UPI and get 10% instant discount on your order
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowUPIConfirmation(true)}
                      className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                    >
                      Get 10% Discount
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>UPI Discount (10%)</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>
                <Button 
                  onClick={handlePayment} 
                  className="w-full mt-6"
                  disabled={!paymentMethod}
                >
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />

      {/* UPI Payment Confirmation Dialog */}
      <UPIPaymentConfirmation
        open={showUPIConfirmation}
        onOpenChange={setShowUPIConfirmation}
        onConfirm={handleUPIConfirmation}
        discount={Math.round(total * 0.1)}
      />
    </div>
  );
};

export default Checkout;
