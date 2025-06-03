
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, MapPin, Clock, Star, Phone, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FarmWorker = () => {
  const { translations } = useLanguage();
  const [selectedService, setSelectedService] = useState('');
  const [location, setLocation] = useState('');

  const services = [
    { id: 'planting', name: 'Crop Planting', price: '₹500/day', rating: 4.8 },
    { id: 'harvesting', name: 'Harvesting', price: '₹600/day', rating: 4.9 },
    { id: 'irrigation', name: 'Irrigation Management', price: '₹400/day', rating: 4.7 },
    { id: 'pest-control', name: 'Pest Control', price: '₹450/day', rating: 4.6 },
    { id: 'soil-prep', name: 'Soil Preparation', price: '₹550/day', rating: 4.8 },
    { id: 'fertilizing', name: 'Fertilizing', price: '₹400/day', rating: 4.7 }
  ];

  const workers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      experience: '8 years',
      specialties: ['Crop Planting', 'Harvesting'],
      rating: 4.9,
      reviews: 156,
      location: 'Hyderabad, Telangana',
      phone: '+91 9876543210',
      price: '₹500/day',
      available: true
    },
    {
      id: 2,
      name: 'Suresh Reddy',
      experience: '12 years',
      specialties: ['Irrigation Management', 'Soil Preparation'],
      rating: 4.8,
      reviews: 203,
      location: 'Warangal, Telangana',
      phone: '+91 9876543211',
      price: '₹550/day',
      available: true
    },
    {
      id: 3,
      name: 'Venkat Rao',
      experience: '6 years',
      specialties: ['Pest Control', 'Fertilizing'],
      rating: 4.7,
      reviews: 89,
      location: 'Karimnagar, Telangana',
      phone: '+91 9876543212',
      price: '₹450/day',
      available: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {translations.farm_worker} Services
          </h1>
          <p className="text-gray-600">
            Find experienced farm workers for your agricultural needs
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="service">Service Type</Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                Search Workers
              </Button>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{service.name}</h3>
                    <Badge variant="secondary">{service.price}</Badge>
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{service.rating}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Workers */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Workers</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {workers.map((worker) => (
              <Card key={worker.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        {worker.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{worker.experience} experience</p>
                    </div>
                    <Badge variant={worker.available ? "default" : "secondary"}>
                      {worker.available ? "Available" : "Busy"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{worker.rating}</span>
                    <span className="text-sm text-gray-600">({worker.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{worker.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{worker.phone}</span>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {worker.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-lg font-bold text-green-600">{worker.price}</span>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" disabled={!worker.available}>
                        <Calendar className="h-4 w-4 mr-1" />
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-green-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium">Contact:</p>
              <p>9912365550</p>
            </div>
            <div>
              <p className="font-medium">Email:</p>
              <p>contactagricaptain@gmail.com</p>
            </div>
            <div>
              <p className="font-medium">Address:</p>
              <p>Nanakramguda Rd, Financial District, Serilingampalle (M), Hyderabad, Telangana 500032</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FarmWorker;
