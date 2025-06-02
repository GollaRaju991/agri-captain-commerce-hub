
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Truck, Shield, RotateCcw, Phone, Sprout, Beaker, Tractor, Award } from 'lucide-react';

const featuredProducts = [
  {
    id: '1',
    name: 'Hybrid Tomato Seeds',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=200&fit=crop',
    category: 'seeds',
    rating: 4.5,
    reviews: 124,
    discount: 25,
    inStock: true,
    description: 'Premium quality hybrid tomato seeds for high-yield farming with excellent disease resistance'
  },
  {
    id: '2',
    name: 'Organic Compost Fertilizer',
    price: 599,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
    category: 'fertilizers',
    rating: 4.8,
    reviews: 89,
    discount: 25,
    inStock: true,
    description: 'Organic compost fertilizer for sustainable farming and improved soil health'
  },
  {
    id: '3',
    name: 'Garden Pruning Tool',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
    category: 'tools',
    rating: 4.3,
    reviews: 56,
    discount: 19,
    inStock: true,
    description: 'Professional grade pruning tools for efficient garden maintenance and plant care'
  },
  {
    id: '4',
    name: 'Drip Irrigation Kit',
    price: 2499,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
    category: 'equipment',
    rating: 4.7,
    reviews: 78,
    discount: 17,
    inStock: true,
    description: 'Complete drip irrigation system for water-efficient farming and precise crop hydration'
  },
  {
    id: '5',
    name: 'Wheat Seeds Premium Quality',
    price: 450,
    originalPrice: 550,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
    category: 'seeds',
    rating: 4.6,
    reviews: 203,
    discount: 18,
    inStock: true,
    description: 'High-yielding wheat seeds suitable for various soil types and weather conditions'
  },
  {
    id: '6',
    name: 'Bio Fertilizer Mix',
    price: 799,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1566909702770-bd3ec25f6b29?w=300&h=200&fit=crop',
    category: 'fertilizers',
    rating: 4.4,
    reviews: 145,
    discount: 20,
    inStock: false,
    description: 'Advanced bio-fertilizer blend for enhanced plant growth and soil enrichment'
  },
  {
    id: '7',
    name: 'Tractor - Mahindra 475 DI',
    price: 550000,
    originalPrice: 580000,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&h=200&fit=crop',
    category: 'equipment',
    rating: 4.9,
    reviews: 312,
    discount: 5,
    inStock: true,
    description: 'Powerful 47 HP tractor ideal for farming operations, plowing, and heavy-duty agricultural work'
  },
  {
    id: '8',
    name: 'Rice Seeds - Basmati',
    price: 380,
    originalPrice: 450,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop',
    category: 'seeds',
    rating: 4.7,
    reviews: 189,
    discount: 16,
    inStock: true,
    description: 'Premium basmati rice seeds for aromatic long-grain rice cultivation'
  },
  {
    id: '9',
    name: 'Pesticide Spray - Organic',
    price: 299,
    originalPrice: 350,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&h=200&fit=crop',
    category: 'agriculture',
    rating: 4.5,
    reviews: 98,
    discount: 15,
    inStock: true,
    description: 'Organic pesticide spray for natural pest control without harmful chemicals'
  },
  {
    id: '10',
    name: 'Harvester Machine',
    price: 1200000,
    originalPrice: 1350000,
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=200&fit=crop',
    category: 'equipment',
    rating: 4.8,
    reviews: 67,
    discount: 11,
    inStock: true,
    description: 'Advanced combine harvester for efficient crop harvesting and grain separation'
  },
  {
    id: '11',
    name: 'Cotton Seeds - Hybrid',
    price: 520,
    originalPrice: 620,
    image: 'https://images.unsplash.com/photo-1609824971439-95bb4b58c5b5?w=300&h=200&fit=crop',
    category: 'seeds',
    rating: 4.6,
    reviews: 234,
    discount: 16,
    inStock: true,
    description: 'High-quality hybrid cotton seeds for superior fiber production and disease resistance'
  },
  {
    id: '12',
    name: 'NPK Fertilizer Complex',
    price: 899,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
    category: 'fertilizers',
    rating: 4.7,
    reviews: 156,
    discount: 18,
    inStock: true,
    description: 'Balanced NPK fertilizer complex for complete plant nutrition and optimal growth'
  }
];

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  
  // Pagination logic
  const totalPages = Math.ceil(featuredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = featuredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <HeroSlider />
      
      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/products?category=seeds" className="group">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                    <Sprout className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold">Seeds</h3>
                  <p className="text-sm text-gray-600">Premium Quality Seeds</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/products?category=fertilizers" className="group">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <Beaker className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">Fertilizers</h3>
                  <p className="text-sm text-gray-600">Organic & Chemical</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/products?category=equipment" className="group">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                    <Tractor className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold">Equipment</h3>
                  <p className="text-sm text-gray-600">Farm Machinery</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/products?category=brands" className="group">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">Brands</h3>
                  <p className="text-sm text-gray-600">Trusted Brands</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination for Featured Products */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose AgriCaptain?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Delivery</h3>
              <p className="text-gray-600">Free delivery across India within 24 hours</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-600">Premium quality products with guarantees</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">7-day return policy for your peace of mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing Products?</h2>
          <p className="text-xl mb-8">Contact our agricultural experts for personalized recommendations</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Phone className="h-5 w-5 mr-2" />
              Call +91 9876543210
            </Button>
            <Link to="/products">
              <Button size="lg" variant="outline" className="text-green-600 border-white hover:bg-white">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
