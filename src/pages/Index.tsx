
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryNavigation from '@/components/CategoryNavigation';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Index = () => {
  const { translations } = useLanguage();

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

  // Featured products to display in the top section
  const featuredProducts = products.slice(0, 3);

  const seedCategories = [
    "Vegetable Seeds",
    "Flower Seeds", 
    "Fruit Seeds",
    "Grain Seeds",
    "Herb Seeds"
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <Header />
      <CategoryNavigation />
      
      {/* Hero Section with Sidebar */}
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-[600px]">
          <div className="p-4">
            {seedCategories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${category.toLowerCase().replace(' ', '-')}`}
                className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* Main Hero Section */}
        <div className="flex-1 relative">
          <div className="relative w-full h-[600px] bg-gradient-to-r from-blue-600 via-purple-600 to-purple-800 overflow-hidden">
            {/* Navigation arrows */}
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10">
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Navigation dots at bottom */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === 2 ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-8 lg:px-12">
                <div className="max-w-2xl text-white">
                  <h3 className="text-lg md:text-xl font-medium mb-3 text-yellow-300">
                    Nourish Your Crops
                  </h3>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    Organic Fertilizers
                  </h1>
                  <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-90">
                    Boost soil health and crop yield with our organic fertilizer range
                  </p>
                  <Link to="/products?category=fertilizers">
                    <Button 
                      size="lg" 
                      className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
                    >
                      Shop Fertilizers
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Top Products</h2>
            <p className="text-sm md:text-base text-gray-600">Discover our most popular agricultural products</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* All Featured Products */}
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

      <Footer />
    </div>
  );
};

export default Index;
