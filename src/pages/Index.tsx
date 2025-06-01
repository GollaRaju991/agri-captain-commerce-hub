
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Truck, Shield, Star, Users, TrendingUp } from 'lucide-react';

const categories = [
  {
    name: 'Seeds',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
    count: '500+ Products'
  },
  {
    name: 'Fertilizers',
    image: 'https://images.unsplash.com/photo-1566909702770-bd3ec25f6b29?w=300&h=200&fit=crop',
    count: '200+ Products'
  },
  {
    name: 'Tools',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
    count: '150+ Products'
  },
  {
    name: 'Equipment',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
    count: '80+ Products'
  }
];

const featuredProducts = [
  {
    id: '1',
    name: 'Hybrid Tomato Seeds',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=200&fit=crop',
    rating: 4.5,
    reviews: 124,
    discount: 25
  },
  {
    id: '2',
    name: 'Organic Compost',
    price: 599,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
    rating: 4.8,
    reviews: 89,
    discount: 25
  },
  {
    id: '3',
    name: 'Garden Pruning Tool',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
    rating: 4.3,
    reviews: 56,
    discount: 19
  },
  {
    id: '4',
    name: 'Drip Irrigation Kit',
    price: 2499,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
    rating: 4.7,
    reviews: 78,
    discount: 17
  }
];

const features = [
  {
    icon: Leaf,
    title: 'Organic Products',
    description: 'Certified organic and eco-friendly agricultural products'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick and reliable delivery across the country'
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'All products are tested and quality guaranteed'
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: '24/7 customer support from agricultural experts'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Slider */}
      <HeroSlider />

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of agricultural products designed to help you grow better
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-40">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-colors" />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600">
                Handpicked products for your farming needs
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card className="group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      {product.discount}% OFF
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-green-600">
                        ₹{product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AgriCaptain?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best agricultural products and services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 mr-2" />
                <span className="text-4xl font-bold">50K+</span>
              </div>
              <p className="text-lg">Happy Farmers</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 mr-2" />
                <span className="text-4xl font-bold">1000+</span>
              </div>
              <p className="text-lg">Products</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 mr-2" />
                <span className="text-4xl font-bold">99%</span>
              </div>
              <p className="text-lg">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
