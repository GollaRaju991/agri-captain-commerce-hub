import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Truck, Shield, Headphones, Users, Share2, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { translations } = useLanguage();

  const features = [
    {
      icon: Truck,
      title: translations.free_delivery || "Free Delivery",
      description: "On orders above ₹500"
    },
    {
      icon: Shield,
      title: translations.secure_payment || "Secure Payment",
      description: "100% safe and secure"
    },
    {
      icon: Headphones,
      title: translations.support || "24/7 Support",
      description: "Expert guidance available"
    }
  ];

  const products = [
    {
      id: "1",
      name: "Premium Tomato Seeds",
      price: 299,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=300&h=300&fit=crop",
      rating: 4.5,
      discount: 25,
      inStock: true,
      description: "High-quality hybrid tomato seeds for excellent yield and disease resistance",
      reviews: 124
    },
    {
      id: "2",
      name: "Organic NPK Fertilizer",
      price: 799,
      originalPrice: 999,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      rating: 4.8,
      discount: 20,
      inStock: true,
      description: "Complete nutrition fertilizer for healthy plant growth and better yield",
      reviews: 89
    },
    {
      id: "3",
      name: "Garden Tools Set",
      price: 1299,
      originalPrice: 1699,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      rating: 4.3,
      discount: 24,
      inStock: true,
      description: "Professional grade garden tools for efficient farming and gardening",
      reviews: 56
    },
    {
      id: "4",
      name: "Drip Irrigation Kit",
      price: 2499,
      originalPrice: 3199,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      rating: 4.6,
      discount: 22,
      inStock: true,
      description: "Water-efficient irrigation system for precise and economical watering",
      reviews: 78
    },
    {
      id: "5",
      name: "Wheat Seeds Premium",
      price: 450,
      originalPrice: 550,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop",
      rating: 4.7,
      discount: 18,
      inStock: true,
      description: "High-yielding wheat seeds suitable for various soil conditions",
      reviews: 203
    },
    {
      id: "6",
      name: "Bio Fertilizer Mix",
      price: 799,
      originalPrice: 999,
      image: "https://images.unsplash.com/photo-1566909702770-bd3ec25f6b29?w=300&h=300&fit=crop",
      rating: 4.4,
      discount: 20,
      inStock: false,
      description: "Organic bio-fertilizer for sustainable farming and soil health",
      reviews: 145
    },
    {
      id: "7",
      name: "Organic Pesticide Spray",
      price: 349,
      originalPrice: 449,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&h=300&fit=crop",
      rating: 4.5,
      discount: 22,
      inStock: true,
      description: "Natural pest control solution safe for organic farming",
      reviews: 98
    },
    {
      id: "8",
      name: "Cotton Seeds Hybrid",
      price: 520,
      originalPrice: 620,
      image: "https://images.unsplash.com/photo-1609824971439-95bb4b58c5b5?w=300&h=300&fit=crop",
      rating: 4.6,
      discount: 16,
      inStock: true,
      description: "Premium hybrid cotton seeds for high fiber quality and yield",
      reviews: 234
    }
  ];

  const socialMediaLinks = [
    { name: 'Facebook', url: 'https://facebook.com/agricaptain', color: 'bg-blue-600' },
    { name: 'WhatsApp', url: 'https://wa.me/9912365550', color: 'bg-green-500' },
    { name: 'Instagram', url: 'https://instagram.com/agricaptain', color: 'bg-pink-500' },
    { name: 'Twitter', url: 'https://twitter.com/agricaptain', color: 'bg-blue-400' },
    { name: 'Snapchat', url: 'https://snapchat.com/add/agricaptain', color: 'bg-yellow-400' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <div className="w-full">
        <HeroSlider />
      </div>

      {/* Features Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <IconComponent className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">{translations.featured_products || "Featured Products"}</h2>
            <p className="text-sm md:text-base text-gray-600">{translations.discover_products || "Discover our top-quality agricultural products"}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-8 md:mt-12">
            <Link to="/products">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-6 md:px-8 py-3 md:py-4"
                onClick={() => window.scrollTo(0, 0)}
              >
                {translations.view_all_products || "View All Products"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">{translations.shop_by_category || "Shop by Category"}</h2>
            <p className="text-sm md:text-base text-gray-600">{translations.browse_categories || "Browse our wide range of agricultural categories"}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: translations.seeds || "Seeds", image: "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=200&h=200&fit=crop", category: "seeds" },
              { name: translations.fertilizers || "Fertilizers", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop", category: "fertilizers" },
              { name: translations.agriculture_products || "Agriculture Tools", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop", category: "agriculture" },
              { name: translations.brands || "Premium Brands", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop", category: "brands" }
            ].map((category, index) => (
              <Link key={index} to={`/products?category=${category.category}`}>
                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-4 md:p-6">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full mx-auto mb-3 md:mb-4"
                    />
                    <h3 className="font-semibold text-sm md:text-base">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Refer Friends Section - Smaller width */}
      <section className="py-6 md:py-8 bg-green-50">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white border-0">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Gift className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold">Refer Friends & Earn ₹25</h3>
                    <p className="text-sm text-green-100">Get ₹25 for each successful referral. 50 referrals = ₹1000 directly to your UPI!</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button variant="secondary" className="bg-white text-green-700 hover:bg-gray-100">
                    Refer Now
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-700">
                    Learn More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
