
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Copy, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Coupons = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Mock coupon data
  const availableCoupons = [
    {
      id: 'WELCOME50',
      title: 'Welcome Offer',
      description: 'Get ₹50 off on your first order',
      discount: '₹50 OFF',
      code: 'WELCOME50',
      minOrder: 500,
      validity: '31 Dec 2024',
      isUsed: false
    },
    {
      id: 'SAVE10',
      title: 'Regular Saver',
      description: 'Save ₹20 on orders above ₹500',
      discount: '₹20 OFF',
      code: 'SAVE10',
      minOrder: 500,
      validity: '31 Dec 2024',
      isUsed: false
    },
    {
      id: 'UPI10',
      title: 'UPI Special',
      description: 'Extra 10% off with UPI payment',
      discount: '10% OFF',
      code: 'UPI10',
      minOrder: 300,
      validity: '31 Dec 2024',
      isUsed: false
    }
  ];

  const usedCoupons = [
    {
      id: 'FIRST20',
      title: 'First Time Buyer',
      description: 'First order discount',
      discount: '₹20 OFF',
      code: 'FIRST20',
      usedOn: '15 Jan 2024',
      isUsed: true
    }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied!",
      description: `Coupon code ${code} has been copied to clipboard`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Coupons</h1>
          <p className="text-gray-600">Save more with exclusive AgriCaptain offers</p>
        </div>

        {/* Available Coupons */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Coupons</h2>
          {availableCoupons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCoupons.map((coupon) => (
                <Card key={coupon.id} className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {coupon.discount}
                      </Badge>
                      <Gift className="h-5 w-5 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">{coupon.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{coupon.description}</p>
                    
                    <div className="bg-gray-50 rounded p-3 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-green-600">{coupon.code}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyCode(coupon.code)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-xs text-gray-500">
                      <p>Min order: ₹{coupon.minOrder}</p>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Valid till {coupon.validity}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                      Use Coupon
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Gift className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No coupons available at the moment</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Used Coupons */}
        {usedCoupons.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Used Coupons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {usedCoupons.map((coupon) => (
                <Card key={coupon.id} className="border-l-4 border-l-gray-300 opacity-75">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-gray-100 text-gray-600 text-xs">
                        {coupon.discount}
                      </Badge>
                      <CheckCircle className="h-5 w-5 text-gray-400" />
                    </div>
                    <CardTitle className="text-lg text-gray-600">{coupon.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-3">{coupon.description}</p>
                    
                    <div className="bg-gray-50 rounded p-3 mb-3">
                      <span className="font-mono font-bold text-gray-500">{coupon.code}</span>
                    </div>
                    
                    <p className="text-xs text-gray-400">Used on {coupon.usedOn}</p>
                    
                    <Button variant="outline" className="w-full mt-4" disabled>
                      Already Used
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Coupons;
