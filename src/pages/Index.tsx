
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Truck, Shield, Headphones, Users, Share2 } from 'lucide-react';
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
      discount: 25
    },
    {
      id: "2",
      name: "Organic NPK Fertilizer",
      price: 799,
      originalPrice: 999,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      rating: 4.8,
      discount: 20
    },
    {
      id: "3",
      name: "Garden Tools Set",
      price: 1299,
      originalPrice: 1699,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      rating: 4.3,
      discount: 24
    },
    {
      id: "4",
      name: "Drip Irrigation Kit",
      price: 2499,
      originalPrice: 3199,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      rating: 4.6,
      discount: 22
    },
    {
    id: "5",
    name: "Premium Tomato Seeds",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 24
  },
  {
    id: "6",
    name: "Organic NPK Fertilizer",
    price: 799,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 24
  },
  {
    id: "7",
    name: "Garden Tools Set",
    price: 1299,
    originalPrice: 1699,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 24
  },
  {
    id: "8",
    name: "Drip Irrigation Kit",
    price: 2499,
    originalPrice: 3199,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 24
  },
  {
    id: "9",
    name: "Organic Compost",
    price: 499,
    originalPrice: 659,
    image: "https://images.unsplash.com/photo-1582281298051-3c3b1f3f1c8d?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 24
  },
  {
    id: "10",
    name: "Hybrid Corn Seeds",
    price: 349,
    originalPrice: 459,
    image: "https://images.unsplash.com/photo-1602524204894-5e4b2d6d5f6e?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 24
  },
  {
    id: "11",
    name: "Electric Sprayer",
    price: 2199,
    originalPrice: 2899,
    image: "https://images.unsplash.com/photo-1581090700227-2e8d6f1f6f3e?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 24
  },
  {
    id: "12",
    name: "Soil pH Tester",
    price: 799,
    originalPrice: 1059,
    image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 24
  },
  {
    id: "13",
    name: "Organic Pesticide",
    price: 599,
    originalPrice: 789,
    image: "https://images.unsplash.com/photo-1581093588401-ecf9c1c3d3c3?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 24
  },
  {
    id: "14",
    name: "Greenhouse Kit",
    price: 4999,
    originalPrice: 6599,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 24
  },
    {
    id: "15",
    name: "Premium Tomato Seeds",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 24
  },
  {
    id: "16",
    name: "Organic NPK Fertilizer",
    price: 799,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 24
  },
  {
    id: "17",
    name: "Garden Tools Set",
    price: 1299,
    originalPrice: 1699,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 24
  },
  {
    id: "18",
    name: "Drip Irrigation Kit",
    price: 2499,
    originalPrice: 3199,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 24
  },
  {
    id: "19",
    name: "Organic Compost",
    price: 499,
    originalPrice: 659,
    image: "https://images.unsplash.com/photo-1582281298051-3c3b1f3f1c8d?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 24
  },
  {
    id: "20",
    name: "Hybrid Corn Seeds",
    price: 349,
    originalPrice: 459,
    image: "https://images.unsplash.com/photo-1602524204894-5e4b2d6d5f6e?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 24
  },
  {
    id: "21",
    name: "Electric Sprayer",
    price: 2199,
    originalPrice: 2899,
    image: "https://images.unsplash.com/photo-1581090700227-2e8d6f1f6f3e?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 24
  },
  {
    id: "22",
    name: "Soil pH Tester",
    price: 799,
    originalPrice: 1059,
    image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 24
  },
  {
    id: "23",
    name: "Organic Pesticide",
    price: 599,
    originalPrice: 789,
    image: "https://images.unsplash.com/photo-1581093588401-ecf9c1c3d3c3?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 24
  },
  {
    id: "24",
    name: "Greenhouse Kit",
    price: 4999,
    originalPrice: 6599,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 24
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
        <div className="container mx-auto px-4">
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
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">{translations.featured_products || "Featured Products"}</h2>
            <p className="text-sm md:text-base text-gray-600">{translations.discover_products || "Discover our top-quality agricultural products"}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-40 md:h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 left-2 bg-red-500 text-xs">
                    {product.discount}% OFF
                  </Badge>
                </div>
                <CardContent className="p-3 md:p-4">
                  <h3 className="font-semibold text-sm md:text-base mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-xs md:text-sm">{product.rating}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-base md:text-lg font-bold text-green-600">₹{product.price}</span>
                    <span className="text-xs md:text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                  </div>
                  <Link to={`/product/${product.id}`}>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-xs md:text-sm py-2 md:py-3">
                      {translations.view_details || "View Details"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8 md:mt-12">
            <Link to="/products">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-6 md:px-8 py-3 md:py-4">
                {translations.view_all_products || "View All Products"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
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

      {/* Social Media Sharing Section */}
      <section className="py-8 md:py-16 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Share AgriCaptain with Friends</h2>
          <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">Help us grow the farming community by sharing our app</p>
          
          <div className="flex justify-center flex-wrap gap-3 md:gap-4">
            {socialMediaLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center space-x-2 text-sm md:text-base`}
              >
                <Share2 className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Share on</span>
                <span>{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
