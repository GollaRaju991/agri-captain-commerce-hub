import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AddressSection from '@/components/checkout/AddressSection';
import PaymentMethodsSection from '@/components/checkout/PaymentMethodsSection';
import OrderSummary from '@/components/checkout/OrderSummary';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import useScrollToTop from '@/hooks/useScrollToTop';
import { supabase } from '@/integrations/supabase/client';
import { dualBackendService } from '@/services/dualBackendService';

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
  
  // Address state
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressesLoading, setAddressesLoading] = useState(true);
  
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedEMI, setSelectedEMI] = useState('');
  
  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Pricing calculations
  const deliveryFee = 0;
  const platformFee = 0;
  const handlingFee = 0;
  const upiDiscount = (paymentMethod === 'upi' && upiId.trim()) ? Math.round(totalPrice * 0.1) : 0;
  const couponDiscount = appliedCoupon === 'WELCOME50' ? 50 : appliedCoupon === 'SAVE10' ? 20 : appliedCoupon === 'FIRST20' ? 20 : 0;
  const finalTotal = Math.max(0, totalPrice + deliveryFee + platformFee + handlingFee - upiDiscount - couponDiscount);

  useScrollToTop();

  useEffect(() => {
    if (!user && location.pathname === '/checkout') {
      setRedirectAfterLogin('/checkout');
    }
  }, [user, location.pathname, setRedirectAfterLogin]);

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

      await saveOrderToDatabase(orderDetails);

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
          <button onClick={() => navigate('/products')} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Continue Shopping
          </button>
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
          <div className="lg:col-span-2 space-y-6">
            <AddressSection
              addresses={addresses}
              selectedAddress={selectedAddress}
              addressesLoading={addressesLoading}
              onAddressSelect={handleAddressSelect}
            />

            <PaymentMethodsSection
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              upiId={upiId}
              setUpiId={setUpiId}
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              expiryDate={expiryDate}
              setExpiryDate={setExpiryDate}
              cvv={cvv}
              setCvv={setCvv}
              nameOnCard={nameOnCard}
              setNameOnCard={setNameOnCard}
              selectedBank={selectedBank}
              setSelectedBank={setSelectedBank}
              selectedEMI={selectedEMI}
              setSelectedEMI={setSelectedEMI}
              finalTotal={finalTotal}
            />
          </div>

          <OrderSummary
            items={items}
            totalPrice={totalPrice}
            upiDiscount={upiDiscount}
            couponDiscount={couponDiscount}
            finalTotal={finalTotal}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            appliedCoupon={appliedCoupon}
            paymentMethod={paymentMethod}
            selectedAddress={selectedAddress}
            onCouponApply={handleCouponApply}
            onPayment={handlePayment}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
