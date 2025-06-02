
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, QrCode, CreditCard } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface UPIPaymentProps {
  amount: number;
  onPaymentSelect: (method: string, discount: number) => void;
}

const UPIPayment: React.FC<UPIPaymentProps> = ({ amount, onPaymentSelect }) => {
  const [selectedUPI, setSelectedUPI] = useState('');
  const [showQR, setShowQR] = useState(false);
  const { translations } = useLanguage();

  const upiMethods = [
    { id: 'phonepe', name: 'PhonePe', icon: '📱', color: 'bg-purple-500' },
    { id: 'gpay', name: 'Google Pay', icon: '🔍', color: 'bg-blue-500' },
    { id: 'paytm', name: 'Paytm', icon: '💰', color: 'bg-indigo-500' },
    { id: 'razorpay', name: 'Razorpay', icon: '⚡', color: 'bg-green-500' },
    { id: 'cred', name: 'CRED', icon: '💳', color: 'bg-orange-500' }
  ];

  const upiDiscount = Math.round(amount * 0.1);
  const finalAmount = amount - upiDiscount;

  const handleUPISelect = (method: string) => {
    setSelectedUPI(method);
    setShowQR(true);
    onPaymentSelect(`upi_${method}`, upiDiscount);
  };

  const generateQRCode = () => {
    // In a real app, this would generate an actual UPI QR code
    return `upi://pay?pa=agricaptain@${selectedUPI}&pn=AgriCaptain&am=${finalAmount}&cu=INR`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          {translations.pay_with_upi}
          <Badge className="bg-green-100 text-green-800">10% {translations.discount}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {upiMethods.map((method) => (
            <Button
              key={method.id}
              variant={selectedUPI === method.id ? "default" : "outline"}
              className="h-auto p-3 flex flex-col items-center space-y-1"
              onClick={() => handleUPISelect(method.id)}
            >
              <span className="text-2xl">{method.icon}</span>
              <span className="text-sm">{method.name}</span>
            </Button>
          ))}
        </div>

        {showQR && selectedUPI && (
          <div className="text-center space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <QrCode className="h-5 w-5" />
              <span className="font-medium">Scan QR Code to Pay</span>
            </div>
            
            <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 mx-auto w-fit">
              <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-6xl">
                📱
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Pay to: AgriCaptain</p>
              <p className="text-lg font-bold text-green-600">₹{finalAmount}</p>
              <p className="text-xs text-green-600">
                You save ₹{upiDiscount} with UPI payment!
              </p>
            </div>
            
            <div className="text-xs text-gray-500 space-y-1">
              <p>UPI ID: agricaptain@{selectedUPI}</p>
              <p>Reference: AGR{Date.now()}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UPIPayment;
