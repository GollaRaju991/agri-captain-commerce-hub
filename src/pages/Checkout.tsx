
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CreditCard, Truck, CheckCircle } from 'lucide-react';
import UPIPayment from '@/components/UPIPayment';
import EMIOptions from '@/components/EMIOptions';
import LocationDetector from '@/components/LocationDetector';

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { translations } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [selectedPaymentDetails, setSelectedPaymentDetails] = useState({
    method: '',
    discount: 0,
    emiMonths: 0,
    emiAmount: 0
  });

  // Calculate charges
  const deliveryCharges = 0;
  const platformCharges = 0;
  const generalDiscount = Math.round(totalPrice * 0.05);
  const additionalDiscount = selectedPaymentDetails.discount;
  const totalDiscount = generalDiscount + additionalDiscount;
  const finalAmount = totalPrice - totalDiscount;

  const handleLocationDetected = (location: any) => {
    setShippingInfo(prev => ({
      ...prev,
      pincode: location.pincode,
      city: location.city,
      state: location.state,
      address: location.area
    }));
  };

  const handlePaymentMethodChange = (method: string, discount: number = 0) => {
    setSelectedPaymentDetails(prev => ({
      ...prev,
      method,
      discount,
      emiMonths: 0,
      emiAmount: 0
    }));
  };

  const handleEMISelect = (months: number, emiAmount: number) => {
    setSelectedPaymentDetails(prev => ({
      ...prev,
      emiMonths: months,
      emiAmount
    }));
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderNum = 'AGR' + Date.now();
      setOrderNumber(orderNum);
      setOrderPlaced(true);
      clearCart();
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your order ${orderNum} will be delivered within 24 hours.`
      });
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (items.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
            <p className="text-gray-600 mb-4">
              Your order <strong>{orderNumber}</strong> has been placed successfully.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <Truck className="h-5 w-5" />
                <span className="font-semibold">Delivery within 24 hours</span>
              </div>
            </div>
            <div className="space-y-2">
              <Button onClick={() => navigate('/')} className="w-full">
                {translations.continue_shopping}
              </Button>
              <Button variant="outline" onClick={() => navigate('/profile')} className="w-full">
                Track Order
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{translations.checkout}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle>1. {translations.shipping_address}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <LocationDetector onLocationDetected={handleLocationDetected} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">{translations.full_name}</Label>
                    <Input
                      id="fullName"
                      value={shippingInfo.fullName}
                      onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{translations.phone_number}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">{translations.pincode}</Label>
                    <Input
                      id="pincode"
                      value={shippingInfo.pincode}
                      onChange={(e) => setShippingInfo({...shippingInfo, pincode: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">{translations.address}</Label>
                  <Input
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                    placeholder="House No, Street, Area"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">{translations.city}</Label>
                    <Input
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">{translations.state}</Label>
                    <Input
                      id="state"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="landmark">Landmark (Optional)</Label>
                    <Input
                      id="landmark"
                      value={shippingInfo.landmark}
                      onChange={(e) => setShippingInfo({...shippingInfo, landmark: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>2. {translations.payment} Method</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="upi">UPI Payment</TabsTrigger>
                    <TabsTrigger value="emi">EMI</TabsTrigger>
                    <TabsTrigger value="cod">COD</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upi" className="mt-4">
                    <UPIPayment 
                      amount={finalAmount} 
                      onPaymentSelect={handlePaymentMethodChange}
                    />
                  </TabsContent>
                  
                  <TabsContent value="emi" className="mt-4">
                    <EMIOptions 
                      amount={finalAmount} 
                      onEMISelect={handleEMISelect}
                    />
                  </TabsContent>
                  
                  <TabsContent value="cod" className="mt-4">
                    <div className="flex items-center space-x-2 text-green-600">
                      <CreditCard className="h-5 w-5" />
                      <span>{translations.cash_on_delivery}</span>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>3. {translations.order_summary}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₹{item.price * item.quantity}</p>
                  </div>
                ))}
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>{translations.subtotal}</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{translations.delivery_charges}</span>
                    <span className="text-green-600">₹{deliveryCharges}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{translations.platform_charges}</span>
                    <span className="text-green-600">₹{platformCharges}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>{translations.discount_amount}</span>
                    <span>-₹{generalDiscount}</span>
                  </div>
                  {additionalDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>{translations.upi_discount}</span>
                      <span>-₹{additionalDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold">
                    <span>{translations.total}</span>
                    <span>₹{finalAmount}</span>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-green-700">
                    <Truck className="h-4 w-4" />
                    <span className="text-sm font-medium">Free delivery within 24 hours</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handlePlaceOrder} 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {translations.place_order}
                </Button>
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
