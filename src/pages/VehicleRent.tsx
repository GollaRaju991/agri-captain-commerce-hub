
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Truck, MapPin, Clock, Star, Phone, Calendar, Fuel } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const VehicleRent = () => {
  const { translations } = useLanguage();
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [location, setLocation] = useState('');

  const vehicleTypes = [
    { id: 'tractor', name: 'Tractor', price: '₹2,000/day', rating: 4.8 },
    { id: 'harvester', name: 'Harvester', price: '₹5,000/day', rating: 4.9 },
    { id: 'cultivator', name: 'Cultivator', price: '₹1,500/day', rating: 4.7 },
    { id: 'plough', name: 'Plough', price: '₹800/day', rating: 4.6 },
    { id: 'sprayer', name: 'Sprayer', price: '₹1,200/day', rating: 4.8 },
    { id: 'truck', name: 'Transport Truck', price: '₹3,000/day', rating: 4.7 }
  ];

  const vehicles = [
    {
      id: 1,
      name: 'Mahindra 575 DI Tractor',
      type: 'Tractor',
      power: '47 HP',
      rating: 4.9,
      reviews: 156,
      location: 'Hyderabad, Telangana',
      owner: 'Rajesh Kumar',
      phone: '+91 9876543210',
      price: '₹2,000/day',
      available: true,
      fuel: 'Diesel',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'John Deere Combine Harvester',
      type: 'Harvester',
      power: '120 HP',
      rating: 4.8,
      reviews: 203,
      location: 'Warangal, Telangana',
      owner: 'Suresh Reddy',
      phone: '+91 9876543211',
      price: '₹5,000/day',
      available: true,
      fuel: 'Diesel',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Massey Ferguson Cultivator',
      type: 'Cultivator',
      power: '35 HP',
      rating: 4.7,
      reviews: 89,
      location: 'Karimnagar, Telangana',
      owner: 'Venkat Rao',
      phone: '+91 9876543212',
      price: '₹1,500/day',
      available: false,
      fuel: 'Diesel',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&h=200&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {translations.rent_vehicles}
          </h1>
          <p className="text-gray-600">
            Rent agricultural vehicles and equipment for your farming needs
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="vehicle">Vehicle Type</Label>
              <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleTypes.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.name}
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
                Search Vehicles
              </Button>
            </div>
          </div>
        </div>

        {/* Vehicle Types */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Vehicle Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicleTypes.map((vehicle) => (
              <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{vehicle.name}</h3>
                    <Badge variant="secondary">{vehicle.price}</Badge>
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{vehicle.rating}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Vehicles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Vehicles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                    />
                    <Badge 
                      variant={vehicle.available ? "default" : "secondary"}
                      className="absolute top-3 right-3"
                    >
                      {vehicle.available ? "Available" : "Rented"}
                    </Badge>
                  </div>
                  
                  <div className="p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        {vehicle.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{vehicle.type} • {vehicle.power}</p>
                    </CardHeader>
                    
                    <CardContent className="p-0 space-y-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{vehicle.rating}</span>
                        <span className="text-sm text-gray-600">({vehicle.reviews} reviews)</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{vehicle.location}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Fuel className="h-4 w-4" />
                        <span>{vehicle.fuel}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{vehicle.owner} - {vehicle.phone}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-lg font-bold text-green-600">{vehicle.price}</span>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                          <Button size="sm" disabled={!vehicle.available}>
                            <Calendar className="h-4 w-4 mr-1" />
                            Rent Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
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

export default VehicleRent;
