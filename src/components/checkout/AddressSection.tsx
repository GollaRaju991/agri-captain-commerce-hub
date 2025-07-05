
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, MapPin } from 'lucide-react';
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
  onAddressRefresh: () => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  addresses,
  selectedAddress,
  addressesLoading,
  onAddressSelect,
  onAddressRefresh
}) => {
  const [showAddressManager, setShowAddressManager] = useState(false);

  const handleAddressAdded = (address: Address) => {
    onAddressSelect(address);
    onAddressRefresh();
    setShowAddressManager(false);
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader className="bg-blue-50 border-b">
        <CardTitle className="text-lg font-medium flex items-center">
          <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">1</span>
          Delivery Address
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {addressesLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading addresses...</span>
          </div>
        ) : addresses && addresses.length > 0 ? (
          <div className="space-y-4">
            <RadioGroup 
              value={selectedAddress?.id || ''} 
              onValueChange={(value) => {
                const address = addresses.find(addr => addr.id === value);
                if (address) onAddressSelect(address);
              }}
            >
              {addresses.map((address) => (
                <div key={address.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value={address.id} className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900">{address.name}</span>
                        <span className="text-sm bg-gray-100 px-2 py-1 rounded capitalize">
                          {address.address_type}
                        </span>
                        {address.is_default && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{address.address}</p>
                      <p className="text-sm text-gray-600 mb-1">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                      <p className="text-sm text-gray-600">Mobile: {address.phone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
            
            <div className="border-t pt-4">
              <Button
                variant="outline"
                onClick={() => setShowAddressManager(true)}
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Address
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No delivery addresses found</p>
            <p className="text-sm text-gray-500 mb-4">Add your first address to proceed with checkout</p>
            <Button 
              onClick={() => setShowAddressManager(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Delivery Address
            </Button>
          </div>
        )}

        {showAddressManager && (
          <div className="mt-6">
            <AddressManager 
              onAddressSelect={handleAddressAdded}
              selectedAddressId={selectedAddress?.id}
              onClose={() => setShowAddressManager(false)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AddressSection;
