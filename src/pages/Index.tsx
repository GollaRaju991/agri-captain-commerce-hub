
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sprout, 
  Beaker, 
  Tractor, 
  Award, 
  Users, 
  Truck, 
  Star,
  ArrowRight,
  Gift,
  Share2,
  Facebook,
  MessageCircle,
  Twitter,
  Instagram,
  Camera
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { translations } = useLanguage();
  const [showReferralBanner, setShowReferralBanner] = useState(true);

  const categories = [
    {
      name: translations.seeds,
      icon: Sprout,
      href: '/products?category=seeds',
      color: 'from-green-500 to-green-600',
      description: 'High-quality seeds for all crops'
    },
    {
      name: translations.fertilizers,
      icon: Beaker,
      href: '/products?category=fertilizers',
      color: 'from-blue-500 to-blue-600',
      description: 'Organic and chemical fertilizers'
    },
    {
      name: translations.agriculture_products,
      icon: Tractor,
      href: '/products?category=agriculture',
      color: 'from-orange-500 to-orange-600',
      description: 'Tools and equipment for farming'
    },
    {
      name: translations.brands,
      icon: Award,
      href: '/products?category=brands',
      color: 'from-purple-500 to-purple-600',
      description: 'Trusted agricultural brands'
    },
    {
      name: translations.farm_worker,
      icon: Users,
      href: '/farm-worker',
      color: 'from-yellow-500 to-yellow-600',
      description: 'Skilled farm workers for hire'
    },
    {
      name: translations.rent_vehicles,
      icon: Truck,
      href: '/vehicle-rent',
      color: 'from-red-500 to-red-600',
      description: 'Agricultural vehicles for rent'
    }
  ];

  const featuredProducts = [
    {
      id: '1',
      name: 'Premium Tomato Seeds',
      price: 299,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=300&h=200&fit=crop',
      category: 'Seeds',
      rating: 4.5,
      reviews: 234,
      discount: 25,
      inStock: true,
      description: 'High-yield hybrid tomato seeds perfect for all seasons',
      forUse: 'Vegetable farming'
    },
    {
      id: '2',
      name: 'Organic Fertilizer Mix',
      price: 499,
      originalPrice: 599,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
      category: 'Fertilizers',
      rating: 4.8,
      reviews: 156,
      discount: 17,
      inStock: true,
      description: 'Rich organic fertilizer for healthy plant growth',
      forUse: 'All crops'
    },
    {
      id: '3',
      name: 'Advanced Spray Pump',
      price: 2999,
      originalPrice: 3499,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
      category: 'Equipment',
      rating: 4.6,
      reviews: 89,
      discount: 14,
      inStock: true,
      description: 'Professional grade spray pump for pesticide application',
      forUse: 'Pesticide spraying'
    },
    {
      id: '4',
      name: 'Wheat Seeds - Premium',
      price: 199,
      originalPrice: 249,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
      category: 'Seeds',
      rating: 4.7,
      reviews: 312,
      discount: 20,
      inStock: true,
      description: 'Disease-resistant wheat seeds with high germination rate',
      forUse: 'Wheat cultivation'
    }
  ];

  const shareOnSocial = (platform: string) => {
    const url = window.location.href;
    const text = "Check out AgriCaptain - Your trusted partner for agricultural products!";
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing, so we'll copy to clipboard
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard! You can now share it on Instagram.');
        return;
      case 'snapchat':
        shareUrl = `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <HeroSlider />

      {/* Referral Banner */}
      {showReferralBanner && (
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-4">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Gift className="h-6 w-6" />
              <div>
                <h3 className="font-bold">Refer Friends & Earn ₹25!</h3>
                <p className="text-sm">Get ₹1000 after 50 successful referrals directly to your UPI wallet</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="secondary" size="sm">
                Start Referring
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowReferralBanner(false)}
                className="text-white hover:bg-white hover:bg-opacity-20"
              >
                ✕
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Social Media Sharing */}
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4">
            <span className="text-sm font-medium text-gray-600">Share AgriCaptain:</span>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareOnSocial('facebook')}
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareOnSocial('whatsapp')}
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareOnSocial('twitter')}
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareOnSocial('instagram')}
                className="border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareOnSocial('snapchat')}
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Categories Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {translations.explore_categories}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of agricultural products and services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Link key={index} to={category.href} className="group">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                    <CardHeader className="text-center pb-4">
                      <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-600 mb-4">{category.description}</p>
                      <div className="flex items-center justify-center text-green-600 font-medium group-hover:text-green-700">
                        <span className="mr-2">{translations.explore_now}</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {translations.featured_products}
              </h2>
              <p className="text-gray-600">
                Handpicked products for your agricultural needs
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                {translations.view_all}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {translations.why_choose_us}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are committed to providing the best agricultural solutions for farmers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Products</h3>
              <p className="text-gray-600">
                We source only the highest quality agricultural products from trusted suppliers
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{translations.free_delivery}</h3>
              <p className="text-gray-600">
                Fast and reliable delivery service to your doorstep at no extra cost
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Our team of agricultural experts is here to help you make the right choices
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
