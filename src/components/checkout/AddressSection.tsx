
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import AddressManager from '@/components/AddressManager';

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

interface AddressSectionProps {
  addresses: Address[];
  selectedAddress: Address | null;
  addressesLoading: boolean;
  onAddressSelect: (address: Address) => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  addresses,
  selectedAddress,
  addressesLoading,
  onAddressSelect
}) => {
  return (
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
                if (address) onAddressSelect(address);
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
              onAddressSelect={onAddressSelect}
              selectedAddressId={selectedAddress?.id}
            />
          </div>
        ) : (
          <AddressManager 
            onAddressSelect={onAddressSelect}
            selectedAddressId={selectedAddress?.id}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AddressSection;
