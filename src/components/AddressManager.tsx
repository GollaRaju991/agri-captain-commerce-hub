import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MapPin, Plus, Edit, Trash2, Home, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import LocationDetector from './LocationDetector';

// Use the Supabase schema type for addresses
interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  address_type: string; // This matches the Supabase schema (string, not union)
  is_default: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

interface AddressManagerProps {
  onAddressSelect: (address: Address) => void;
  selectedAddressId?: string;
}

const AddressManager: React.FC<AddressManagerProps> = ({ onAddressSelect, selectedAddressId }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    address_type: 'home' as string
  });

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching addresses:', error);
        toast({
          title: "Error loading addresses",
          description: "Failed to load your saved addresses",
          variant: "destructive"
        });
      } else {
        setAddresses(data || []);
        
        // Auto-select default address
        const defaultAddress = data?.find((addr) => addr.is_default);
        if (defaultAddress && !selectedAddressId) {
          onAddressSelect(defaultAddress);
        }
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const addressData = {
        user_id: user?.id,
        ...formData,
        is_default: addresses.length === 0 // First address is default
      };

      if (editingAddress) {
        const { error } = await supabase
          .from('addresses')
          .update(addressData)
          .eq('id', editingAddress.id);

        if (error) {
          console.error('Error updating address:', error);
          toast({
            title: "Error updating address",
            variant: "destructive"
          });
          return;
        }
        toast({ title: "Address updated successfully" });
      } else {
        const { data, error } = await supabase
          .from('addresses')
          .insert([addressData])
          .select()
          .single();

        if (error) {
          console.error('Error saving address:', error);
          toast({
            title: "Error saving address",
            variant: "destructive"
          });
          return;
        }
        toast({ title: "Address added successfully" });
      }

      // Refresh addresses
      await fetchAddresses();
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        address_type: 'home'
      });
      setShowForm(false);
      setEditingAddress(null);
    } catch (error) {
      console.error('Error saving address:', error);
      toast({
        title: "Error saving address",
        variant: "destructive"
      });
    }
  };

  const handleEditAddress = (address: Address) => {
    setFormData({
      name: address.name,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      address_type: address.address_type
    });
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', addressId);

      if (error) {
        console.error('Error deleting address:', error);
        toast({
          title: "Error deleting address",
          variant: "destructive"
        });
      } else {
        toast({ title: "Address deleted successfully" });
        await fetchAddresses();
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleSetDefault = async (addressId: string) => {
    try {
      // First, unset all other addresses as default
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', user?.id);

      // Then set the selected address as default
      const { error } = await supabase
        .from('addresses')
        .update({ is_default: true })
        .eq('id', addressId);

      if (error) {
        console.error('Error setting default address:', error);
        toast({
          title: "Error setting default address",
          variant: "destructive"
        });
      } else {
        toast({ title: "Default address updated" });
        await fetchAddresses();
        
        const defaultAddress = addresses.find(addr => addr.id === addressId);
        if (defaultAddress) {
          onAddressSelect(defaultAddress);
        }
      }
    } catch (error) {
      console.error('Error setting default address:', error);
    }
  };

  const handleAddressSelection = (addressId: string) => {
    const selectedAddress = addresses.find(addr => addr.id === addressId);
    if (selectedAddress) {
      onAddressSelect(selectedAddress);
    }
  };

  if (loading) {
    return <div>Loading addresses...</div>;
  }

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
                <Label htmlFor="address_type">Address Type</Label>
                <select
                  id="address_type"
                  name="address_type"
                  value={formData.address_type}
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
                      address_type: 'home'
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

      {/* Address List with Radio Buttons */}
      {addresses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Select Delivery Address</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedAddressId} onValueChange={handleAddressSelection}>
              <div className="space-y-3">
                {addresses.map((address) => (
                  <div key={address.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={address.id} className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center space-x-1">
                          {address.address_type === 'home' ? (
                            <Home className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Building className="h-4 w-4 text-gray-500" />
                          )}
                          <span className="font-medium">{address.name}</span>
                        </div>
                        {address.is_default && (
                          <Badge variant="secondary" className="text-xs">
                            Default
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs capitalize">
                          {address.address_type}
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
                      {!address.is_default && (
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
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

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
