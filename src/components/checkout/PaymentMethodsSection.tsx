
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CreditCard, Smartphone, Building } from 'lucide-react';

interface PaymentMethodsSectionProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  upiId: string;
  setUpiId: (id: string) => void;
  cardNumber: string;
  setCardNumber: (number: string) => void;
  expiryDate: string;
  setExpiryDate: (date: string) => void;
  cvv: string;
  setCvv: (cvv: string) => void;
  nameOnCard: string;
  setNameOnCard: (name: string) => void;
  selectedBank: string;
  setSelectedBank: (bank: string) => void;
  selectedEMI: string;
  setSelectedEMI: (emi: string) => void;
  finalTotal: number;
}

const PaymentMethodsSection: React.FC<PaymentMethodsSectionProps> = ({
  paymentMethod,
  setPaymentMethod,
  upiId,
  setUpiId,
  cardNumber,
  setCardNumber,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv,
  nameOnCard,
  setNameOnCard,
  selectedBank,
  setSelectedBank,
  selectedEMI,
  setSelectedEMI,
  finalTotal
}) => {
  return (
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
  );
};

export default PaymentMethodsSection;
