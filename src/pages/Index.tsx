
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import ProductCard from '@/components/ProductCard';
import UPIPaymentConfirmation from '@/components/UPIPaymentConfirmation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Shield, Headphones, Users, Leaf, TrendingUp, Star, Gift } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { translations } = useLanguage();
  const [showUPIConfirmation, setShowUPIConfirmation] = useState(false);

  const featuredProducts = [
    {
      id: 1,
      name: translations.hybrid_tomato_seeds || 'Hybrid Tomato Seeds',
      price: 299,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=200&fit=crop',
      category: 'seeds',
      rating: 4.5,
      reviews: 124,
      description: 'Premium quality hybrid tomato seeds for high-yield farming',
      forUse: 'Vegetable farming and kitchen gardens'
    },
    {
      id: 2,
      name: translations.organic_fertilizer || 'Organic Compost Fertilizer',
      price: 599,
      originalPrice: 799,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
      category: 'fertilizers',
      rating: 4.8,
      reviews: 89,
      description: 'Organic compost fertilizer for sustainable farming',
      forUse: 'All crops and soil improvement'
    },
    {
      id: 3,
      name: translations.garden_tools || 'Garden Pruning Tool',
      price: 1299,
      originalPrice: 1599,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
      category: 'tools',
      rating: 4.3,
      reviews: 56,
      description: 'Professional grade pruning tools for garden maintenance',
      forUse: 'Tree pruning and garden maintenance'
    },
    {
      id: 4,
      name: translations.irrigation_kit || 'Drip Irrigation Kit',
      price: 2499,
      originalPrice: 2999,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
      category: 'equipment',
      rating: 4.7,
      reviews: 78,
      description: 'Complete drip irrigation system for water-efficient farming',
      forUse: 'Water-efficient crop irrigation'
    }
  ];

  const categories = [
    { name: translations.seeds, icon: Leaf, href: '/products?category=seeds', color: 'bg-green-500' },
    { name: translations.fertilizers, icon: TrendingUp, href: '/products?category=fertilizers', color: 'bg-blue-500' },
    { name: translations.agriculture_products, icon: Shield, href: '/products?category=agriculture', color: 'bg-purple-500' },
    { name: 'Equipment', icon: Truck, href: '/products?category=equipment', color: 'bg-orange-500' }
  ];

  const features = [
    {
      icon: Truck,
      title: translations.free_delivery,
      description: translations.free_delivery_desc || 'Free delivery within 24 hours for all orders'
    },
    {
      icon: Shield,
      title: translations.quality_guarantee,
      description: translations.quality_guarantee_desc || '100% authentic products with quality guarantee'
    },
    {
      icon: Headphones,
      title: translations.customer_support,
      description: translations.customer_support_desc || '24/7 customer support for all your needs'
    },
    {
      icon: Users,
      title: translations.expert_guidance,
      description: translations.expert_guidance_desc || 'Expert guidance from agriculture professionals'
    }
  ];

  const handleBuyNow = (product: any) => {
    setShowUPIConfirmation(true);
  };

  const handleUPIPaymentComplete = (discount: number) => {
    setShowUPIConfirmation(false);
    // Handle successful payment with discount
  };

  const handleRegularPayment = () => {
    setShowUPIConfirmation(false);
    // Handle regular payment flow
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <HeroSlider />

      {/* Referral Program Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Gift className="h-6 w-6" />
            <span className="text-lg font-semibold">
              Refer Friends & Earn ₹25 for Each Referral! 
            </span>
          </div>
          <p className="text-sm mt-1">
            50 referrals = ₹1000 directly to your PhonePe/UPI wallet!
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {translations.shop_by_category}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={index}
                  to={category.href}
                  className="group"
                >
                  <Card className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50">
                    <CardContent className="p-8">
                      <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg group-hover:text-green-600 transition-colors">
                        {category.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              {translations.featured_products}
            </h2>
            <Link to="/products">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                {translations.view_all}
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {translations.why_choose_us}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center border-0 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="bg-gradient-to-r from-green-600 to-green-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Media Sharing Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Share AgriCaptain with Your Network</h2>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="bg-blue-600 border-blue-400 text-white hover:bg-blue-700">
              Facebook
            </Button>
            <Button variant="outline" className="bg-green-600 border-green-400 text-white hover:bg-green-700">
              WhatsApp
            </Button>
            <Button variant="outline" className="bg-pink-600 border-pink-400 text-white hover:bg-pink-700">
              Instagram
            </Button>
            <Button variant="outline" className="bg-blue-400 border-blue-300 text-white hover:bg-blue-500">
              Twitter
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold text-lg mb-2">Phone</h4>
                <p className="text-gray-600">9912365550</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Email</h4>
                <p className="text-gray-600">contactagricaptain@gmail.com</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Address</h4>
                <p className="text-gray-600">
                  Nanakramguda Rd, Financial District, Serilingampalle (M), Hyderabad, Telangana 500032
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <UPIPaymentConfirmation
        open={showUPIConfirmation}
        onOpenChange={setShowUPIConfirmation}
        amount={2499}
        onPaymentComplete={handleUPIPaymentComplete}
        onRegularPayment={handleRegularPayment}
      />
    </div>
  );
};

export default Index;
