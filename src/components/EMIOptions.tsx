
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Calculator } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface EMIOptionsProps {
  amount: number;
  onEMISelect: (months: number, emi: number) => void;
}

const EMIOptions: React.FC<EMIOptionsProps> = ({ amount, onEMISelect }) => {
  const [selectedEMI, setSelectedEMI] = useState<number | null>(null);
  const { translations } = useLanguage();

  const emiOptions = [
    { months: 3, rate: 12, processing: 99 },
    { months: 6, rate: 14, processing: 149 },
    { months: 9, rate: 16, processing: 199 },
    { months: 12, rate: 18, processing: 249 }
  ];

  const calculateEMI = (principal: number, rate: number, months: number) => {
    const monthlyRate = rate / (12 * 100);
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const handleEMISelect = (months: number) => {
    const option = emiOptions.find(opt => opt.months === months);
    if (option) {
      const emiAmount = calculateEMI(amount, option.rate, months);
      setSelectedEMI(months);
      onEMISelect(months, emiAmount);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          {translations.pay_with_emi}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {emiOptions.map((option) => {
            const emiAmount = calculateEMI(amount, option.rate, option.months);
            const totalAmount = (emiAmount * option.months) + option.processing;
            const extraAmount = totalAmount - amount;
            
            return (
              <div
                key={option.months}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedEMI === option.months
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
                onClick={() => handleEMISelect(option.months)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{option.months} Months EMI</span>
                      <Badge variant="outline">{option.rate}% p.a.</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Processing Fee: ₹{option.processing}
                    </p>
                    <p className="text-xs text-gray-500">
                      Total Payable: ₹{totalAmount} (+₹{extraAmount})
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600">
                      ₹{emiAmount}<span className="text-sm">/month</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedEMI && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">EMI Breakdown</span>
            </div>
            <div className="text-xs text-blue-700 space-y-1">
              <p>• No prepayment charges</p>
              <p>• Instant approval for eligible customers</p>
              <p>• Secure payment processing</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EMIOptions;
