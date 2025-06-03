
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Plus, Edit, Trash2, Home, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LocationDetector from './LocationDetector';

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  type: 'home' | 'work';
  isDefault: boolean;
}

interface AddressManagerProps {
  onAddressSelect: (address: Address) => void;
  selectedAddressId?: string;
}

const AddressManager: React.FC<AddressManagerProps> = ({ onAddressSelect, selectedAddressId }) => {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    type: 'home' as 'home' | 'work'
  });

  useEffect(() => {
    // Load saved addresses from localStorage
    const savedAddresses = localStorage.getItem('agricaptain_addresses');
    if (savedAddresses) {
      const parsed = JSON.parse(savedAddresses);
      setAddresses(parsed);
      
      // Auto-select default address
      const defaultAddress = parsed.find((addr: Address) => addr.isDefault);
      if (defaultAddress && !selectedAddressId) {
        onAddressSelect(defaultAddress);
      }
    } else {
      // If no addresses, show form to add first address
      setShowForm(true);
    }
  }, []);

  useEffect(() => {
    // Save addresses to localStorage whenever addresses change
    localStorage.setItem('agricaptain_addresses', JSON.stringify(addresses));
  }, [addresses]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLocationDetected = (location: any) => {
    setFormData({
      ...formData,
      pincode: location.pincode,
      city: location.city,
      state: location.state,
      address: `${location.area}, ${location.city}`
    });
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const newAddress: Address = {
      id: editingAddress?.id || Date.now().toString(),
      ...formData,
      isDefault: addresses.length === 0 // First address is default
    };

    if (editingAddress) {
      setAddresses(addresses.map(addr => addr.id === editingAddress.id ? newAddress : addr));
      toast({ title: "Address updated successfully" });
    } else {
      setAddresses([...addresses, newAddress]);
      toast({ title: "Address added successfully" });
    }

    // Auto-select the new/updated address
    onAddressSelect(newAddress);
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      type: 'home'
    });
    setShowForm(false);
    setEditingAddress(null);
  };

  const handleEditAddress = (address: Address) => {
    setFormData({
      name: address.name,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      type: address.type
    });
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDeleteAddress = (addressId: string) => {
    setAddresses(addresses.filter(addr => addr.id !== addressId));
    toast({ title: "Address deleted successfully" });
  };

  const handleSetDefault = (addressId: string) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    }));
    setAddresses(updatedAddresses);
    
    const defaultAddress = updatedAddresses.find(addr => addr.id === addressId);
    if (defaultAddress) {
      onAddressSelect(defaultAddress);
    }
    
    toast({ title: "Default address updated" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Delivery Address</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowForm(!showForm)}
          className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Address
        </Button>
      </div>

      {/* Address Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveAddress} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House No, Street, Landmark"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="type">Address Type</Label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                </select>
              </div>

              <div className="mb-4">
                <LocationDetector onLocationDetected={handleLocationDetected} />
              </div>

              <div className="flex space-x-3">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {editingAddress ? 'Update Address' : 'Save Address'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingAddress(null);
                    setFormData({
                      name: '',
                      phone: '',
                      address: '',
                      city: '',
                      state: '',
                      pincode: '',
                      type: 'home'
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Address List */}
      <div className="space-y-3">
        {addresses.map((address) => (
          <Card
            key={address.id}
            className={`cursor-pointer transition-all ${
              selectedAddressId === address.id
                ? 'border-green-500 bg-green-50'
                : 'hover:border-gray-300'
            }`}
            onClick={() => onAddressSelect(address)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1">
                      {address.type === 'home' ? (
                        <Home className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Building className="h-4 w-4 text-gray-500" />
                      )}
                      <span className="font-medium">{address.name}</span>
                    </div>
                    {address.isDefault && (
                      <Badge variant="secondary" className="text-xs">
                        Default
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs capitalize">
                      {address.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{address.address}</p>
                  <p className="text-sm text-gray-600 mb-1">
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p className="text-sm text-gray-600">Phone: {address.phone}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditAddress(address);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAddress(address.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                  {!address.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetDefault(address.id);
                      }}
                    >
                      Set Default
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {addresses.length === 0 && !showForm && (
        <Card className="text-center py-8">
          <CardContent>
            <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No addresses saved</h3>
            <p className="text-gray-600 mb-4">Add your first address to proceed with checkout</p>
            <Button onClick={() => setShowForm(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Address
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AddressManager;
