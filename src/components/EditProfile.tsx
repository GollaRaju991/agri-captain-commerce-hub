
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Edit, User, Phone, MapPin, CreditCard, FileText } from 'lucide-react';

const EditProfile = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    panCard: user?.panCard || '',
    aadharCard: user?.aadharCard || ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!formData.name.trim()) {
      toast({
        title: "Name is required",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    // Update user profile
    updateUser({
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      panCard: formData.panCard,
      aadharCard: formData.aadharCard,
    });

    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated",
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full mt-4">
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="flex items-center space-x-2 mb-2">
              <User className="h-4 w-4" />
              <span>Name</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          {/* Phone Number */}
          <div>
            <Label htmlFor="phone" className="flex items-center space-x-2 mb-2">
              <Phone className="h-4 w-4" />
              <span>Phone Number</span>
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
              type="tel"
            />
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address" className="flex items-center space-x-2 mb-2">
              <MapPin className="h-4 w-4" />
              <span>Address</span>
            </Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter your complete address"
              rows={3}
            />
          </div>

          {/* PAN Card */}
          <div>
            <Label htmlFor="panCard" className="flex items-center space-x-2 mb-2">
              <CreditCard className="h-4 w-4" />
              <span>PAN Card</span>
            </Label>
            <Input
              id="panCard"
              value={formData.panCard}
              onChange={(e) => handleInputChange('panCard', e.target.value.toUpperCase())}
              placeholder="Enter PAN card number (e.g., ABCDE1234F)"
              maxLength={10}
            />
          </div>

          {/* Aadhar Card */}
          <div>
            <Label htmlFor="aadharCard" className="flex items-center space-x-2 mb-2">
              <FileText className="h-4 w-4" />
              <span>Aadhar Card</span>
            </Label>
            <Input
              id="aadharCard"
              value={formData.aadharCard}
              onChange={(e) => handleInputChange('aadharCard', e.target.value)}
              placeholder="Enter Aadhar card number"
              maxLength={12}
              type="text"
              pattern="[0-9]*"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Save Changes
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
