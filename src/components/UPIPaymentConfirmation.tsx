
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, QrCode, CheckCircle, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface UPIPaymentConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  onPaymentComplete: (discount: number) => void;
  onRegularPayment: () => void;
}

const UPIPaymentConfirmation: React.FC<UPIPaymentConfirmationProps> = ({
  open,
  onOpenChange,
  amount,
  onPaymentComplete,
  onRegularPayment
}) => {
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedUPI, setSelectedUPI] = useState('');
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const { translations } = useLanguage();
  const { toast } = useToast();

  const upiMethods = [
    { id: 'phonepe', name: 'PhonePe', icon: '📱', color: 'bg-purple-500' },
    { id: 'gpay', name: 'Google Pay', icon: '🔍', color: 'bg-blue-500' },
    { id: 'paytm', name: 'Paytm', icon: '💰', color: 'bg-indigo-500' },
    { id: 'razorpay', name: 'Razorpay', icon: '⚡', color: 'bg-green-500' },
    { id: 'cred', name: 'CRED', icon: '💳', color: 'bg-orange-500' }
  ];

  const discount = Math.round(amount * 0.1);
  const finalAmount = amount - discount;

  const handleYesPayNow = () => {
    setShowPaymentOptions(true);
  };

  const handleNoRegularPayment = () => {
    onRegularPayment();
    onOpenChange(false);
  };

  const handleUPISelect = (method: string) => {
    setSelectedUPI(method);
    setPaymentInProgress(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentInProgress(false);
      toast({
        title: translations.payment_completed,
        description: `You saved ₹${discount} with UPI payment!`,
      });
      onPaymentComplete(discount);
      onOpenChange(false);
      resetState();
    }, 3000);
  };

  const resetState = () => {
    setShowPaymentOptions(false);
    setSelectedUPI('');
    setPaymentInProgress(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    resetState();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-green-600" />
            {translations.upi_payment_confirmation}
          </DialogTitle>
        </DialogHeader>

        {!showPaymentOptions ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <Badge className="bg-green-600 text-white text-lg px-4 py-2 mb-2">
                  10% {translations.discount}
                </Badge>
                <p className="text-green-800 font-medium">
                  {translations.complete_payment_get_discount}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span>Original Amount:</span>
                  <span>₹{amount}</span>
                </div>
                <div className="flex justify-between items-center mb-2 text-green-600">
                  <span>UPI Discount (10%):</span>
                  <span>-₹{discount}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                  <span>Final Amount:</span>
                  <span className="text-green-600">₹{finalAmount}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">
                {translations.scan_qr_or_pay}
              </p>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleYesPayNow}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {translations.yes_pay_now}
              </Button>
              <Button 
                onClick={handleNoRegularPayment}
                variant="outline"
                className="w-full"
              >
                {translations.no_regular_payment}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Select your preferred UPI payment method:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {upiMethods.map((method) => (
                <Button
                  key={method.id}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-green-50 hover:border-green-500"
                  onClick={() => handleUPISelect(method.id)}
                  disabled={paymentInProgress}
                >
                  <span className="text-3xl">{method.icon}</span>
                  <span className="text-sm font-medium">{method.name}</span>
                </Button>
              ))}
            </div>

            {paymentInProgress && (
              <div className="text-center space-y-3 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="font-medium text-blue-600">Processing Payment...</span>
                </div>
                
                <div className="bg-white p-4 rounded-lg border-2 border-dashed border-blue-300 mx-auto w-fit">
                  <div className="w-32 h-32 bg-blue-100 flex items-center justify-center text-6xl">
                    📱
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Pay to: AgriCaptain</p>
                  <p className="text-lg font-bold text-green-600">₹{finalAmount}</p>
                  <p className="text-xs text-green-600">
                    Saving ₹{discount} with UPI payment!
                  </p>
                </div>
                
                <div className="text-xs text-gray-500 space-y-1">
                  <p>UPI ID: agricaptain@{selectedUPI}</p>
                  <p>Reference: AGR{Date.now()}</p>
                </div>
              </div>
            )}

            <Button 
              onClick={() => setShowPaymentOptions(false)}
              variant="ghost"
              className="w-full"
              disabled={paymentInProgress}
            >
              Back to Options
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UPIPaymentConfirmation;
