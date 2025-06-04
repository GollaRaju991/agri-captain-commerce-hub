
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Edit, User, Phone, MapPin, CreditCard, FileText, Loader2 } from 'lucide-react';

const EditProfile = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    panCard: user?.panCard || '',
    aadharCard: user?.aadharCard || ''
  });

  const handleInputChange = (field: string, value: string) => {
    // Sanitize input to prevent XSS
    let sanitizedValue = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    if (field === 'panCard') {
      sanitizedValue = sanitizedValue.toUpperCase().replace(/[^A-Z0-9]/g, '');
    } else if (field === 'aadharCard') {
      sanitizedValue = sanitizedValue.replace(/[^0-9]/g, '');
    } else if (field === 'phone') {
      sanitizedValue = sanitizedValue.replace(/[^+0-9\s-]/g, '');
    }

    setFormData(prev => ({
      ...prev,
      [field]: sanitizedValue
    }));
  };

  const handleSave = async () => {
    // Validate required fields
    if (!formData.name.trim()) {
      toast({
        title: "Name is required",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const result = await updateUser({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        panCard: formData.panCard.trim(),
        aadharCard: formData.aadharCard.trim(),
      });

      if (result.success) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated",
        });
        setOpen(false);
      } else {
        toast({
          title: "Update Failed",
          description: result.error || "Failed to update profile",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast({
        title: "Update Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
              <span>Name *</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              maxLength={100}
              required
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
              maxLength={15}
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
              maxLength={500}
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
              onChange={(e) => handleInputChange('panCard', e.target.value)}
              placeholder="Enter PAN card number (e.g., ABCDE1234F)"
              maxLength={10}
            />
            {formData.panCard && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panCard) && (
              <p className="text-sm text-red-600 mt-1">
                Invalid PAN format. Use: ABCDE1234F
              </p>
            )}
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
            />
            {formData.aadharCard && !/^\d{12}$/.test(formData.aadharCard) && (
              <p className="text-sm text-red-600 mt-1">
                Aadhar card must be 12 digits
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button onClick={handleSave} className="flex-1" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1" disabled={loading}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
