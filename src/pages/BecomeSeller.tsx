
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Star, Users, ShieldCheck, TrendingUp, Wallet, Phone, Mail, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BecomeSeller = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    pincode: '',
    gstNumber: '',
    panNumber: '',
    businessType: 'individual'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. We'll review your application and get back to you within 24 hours.",
    });
    navigate('/');
  };

  const benefits = [
    { icon: Users, title: "45 crore+ AgriCaptain customers", description: "Reach millions of farmers" },
    { icon: ShieldCheck, title: "7* days secure & regular payments", description: "Get paid on time, every time" },
    { icon: TrendingUp, title: "Low cost of doing business", description: "Minimal fees, maximum profit" },
    { icon: Wallet, title: "One click Seller Support", description: "24/7 assistance when you need it" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 mb-8 text-white">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex-1 mb-6 lg:mb-0">
              <h1 className="text-4xl font-bold mb-4">Sell Online with AgriCaptain</h1>
              <p className="text-xl mb-6">Join India's largest agricultural marketplace and grow your business</p>
              <div className="flex flex-wrap gap-4">
                <Badge className="bg-yellow-500 text-black px-3 py-1">
                  <Star className="h-4 w-4 mr-1" />
                  4.5+ Seller Rating
                </Badge>
                <Badge className="bg-green-500 px-3 py-1">Fast Registration</Badge>
                <Badge className="bg-purple-500 px-3 py-1">Free Support</Badge>
              </div>
            </div>
            <div className="lg:w-96">
              <img src="/placeholder.svg" alt="Seller Success" className="rounded-lg" />
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Registration Form */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Start Selling in 3 Simple Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">1. Basic Details</TabsTrigger>
                  <TabsTrigger value="business">2. Business Info</TabsTrigger>
                  <TabsTrigger value="documents">3. Documents</TabsTrigger>
                </TabsList>
                
                <form onSubmit={handleSubmit}>
                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ownerName">Full Name *</Label>
                        <Input
                          id="ownerName"
                          name="ownerName"
                          value={formData.ownerName}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Mobile Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="businessType">Business Type *</Label>
                        <select
                          id="businessType"
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleInputChange}
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        >
                          <option value="individual">Individual</option>
                          <option value="proprietorship">Proprietorship</option>
                          <option value="partnership">Partnership</option>
                          <option value="company">Private Limited Company</option>
                        </select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="business" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="businessName">Business/Store Name *</Label>
                        <Input
                          id="businessName"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Business Address *</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
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
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="documents" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="panNumber">PAN Number *</Label>
                        <Input
                          id="panNumber"
                          name="panNumber"
                          value={formData.panNumber}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                          placeholder="ABCDE1234F"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                        <Input
                          id="gstNumber"
                          name="gstNumber"
                          value={formData.gstNumber}
                          onChange={handleInputChange}
                          className="mt-1"
                          placeholder="22ABCDE1234F1Z5"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">What happens next?</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• We'll verify your details within 24 hours</li>
                        <li>• You'll receive login credentials via email</li>
                        <li>• Start listing your products immediately</li>
                        <li>• Our team will help you optimize your store</li>
                      </ul>
                    </div>

                    <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3">
                      Submit Application
                    </Button>
                  </TabsContent>
                </form>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Success Stories */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">Seller Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="font-semibold mb-2">Farmer {i}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    "AgriCaptain helped me increase my sales by 300% in just 6 months!"
                  </p>
                  <div className="flex justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BecomeSeller;
