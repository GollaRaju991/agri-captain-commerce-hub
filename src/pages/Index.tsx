
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import UPIPaymentConfirmation from '@/components/UPIPaymentConfirmation';
import { 
  Truck, 
  Shield, 
  Users, 
  Clock,
  Star,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

// Sample products data with more variety
const sampleProducts = [
  {
    id: 1,
    name: 'Premium Tomato Seeds',
    price: 299,
    originalPrice: 350,
    image: '/placeholder.svg',
    category: 'seeds',
    rating: 4.5,
    reviews: 128,
    description: 'High-yield hybrid tomato seeds perfect for all seasons. Disease resistant variety.',
    forUse: 'Vegetable farming, home gardening'
  },
  {
    id: 2,
    name: 'Organic Fertilizer NPK',
    price: 899,
    originalPrice: 1099,
    image: '/placeholder.svg',
    category: 'fertilizers',
    rating: 4.8,
    reviews: 256,
    description: 'Complete organic fertilizer with balanced NPK ratio for healthy plant growth.',
    forUse: 'All crops, organic farming'
  },
  {
    id: 3,
    name: 'John Deere Mini Tractor',
    price: 485000,
    originalPrice: 520000,
    image: '/placeholder.svg',
    category: 'equipment',
    rating: 4.9,
    reviews: 45,
    description: 'Compact tractor ideal for small to medium farms with excellent fuel efficiency.',
    forUse: 'Field preparation, cultivation, harvesting'
  },
  {
    id: 4,
    name: 'Bio Pesticide Spray',
    price: 450,
    originalPrice: 550,
    image: '/placeholder.svg',
    category: 'sprays',
    rating: 4.3,
    reviews: 89,
    description: 'Eco-friendly pesticide made from natural ingredients, safe for organic farming.',
    forUse: 'Pest control, organic farming'
  },
  {
    id: 5,
    name: 'Wheat Seeds - HD 2967',
    price: 180,
    originalPrice: 220,
    image: '/placeholder.svg',
    category: 'seeds',
    rating: 4.6,
    reviews: 167,
    description: 'High-yielding wheat variety suitable for irrigated conditions.',
    forUse: 'Wheat cultivation, commercial farming'
  },
  {
    id: 6,
    name: 'Power Weeder Machine',
    price: 12500,
    originalPrice: 15000,
    image: '/placeholder.svg',
    category: 'equipment',
    rating: 4.4,
    reviews: 78,
    description: 'Efficient weeding machine that reduces manual labor and increases productivity.',
    forUse: 'Weed control, field maintenance'
  },
  {
    id: 7,
    name: 'Drip Irrigation Kit',
    price: 3500,
    originalPrice: 4200,
    image: '/placeholder.svg',
    category: 'equipment',
    rating: 4.7,
    reviews: 134,
    description: 'Complete drip irrigation system for water-efficient farming.',
    forUse: 'Water management, precision farming'
  },
  {
    id: 8,
    name: 'Calcium Nitrate Fertilizer',
    price: 650,
    originalPrice: 780,
    image: '/placeholder.svg',
    category: 'fertilizers',
    rating: 4.5,
    reviews: 92,
    description: 'Water-soluble calcium fertilizer for stronger plants and better fruit quality.',
    forUse: 'Fruit crops, vegetable farming'
  }
];

const Index = () => {
  const { translations } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [upiPaymentOpen, setUpiPaymentOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const productsPerPage = 6;

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sampleProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sampleProducts.length / productsPerPage);

  const handleBuyNow = (product: any) => {
    setSelectedProduct(product);
    setUpiPaymentOpen(true);
  };

  const handleUPIPaymentComplete = (discount: number) => {
    console.log('UPI Payment completed with discount:', discount);
    // Here you would normally process the order with discount
  };

  const handleRegularPayment = () => {
    console.log('Proceeding with regular payment');
    // Here you would redirect to regular checkout
  };

  const categories = [
    { name: translations.seeds, icon: '🌱', color: 'bg-green-100 text-green-800' },
    { name: translations.fertilizers, icon: '🧪', color: 'bg-blue-100 text-blue-800' },
    { name: 'Equipment', icon: '🚜', color: 'bg-orange-100 text-orange-800' },
    { name: 'Sprays', icon: '💨', color: 'bg-purple-100 text-purple-800' }
  ];

  const features = [
    {
      icon: Truck,
      title: translations.free_delivery,
      description: 'Fast delivery across India'
    },
    {
      icon: Shield,
      title: translations.quality_guarantee,
      description: 'Authentic products only'
    },
    {
      icon: Users,
      title: translations.trusted_by_farmers,
      description: 'Growing community'
    },
    {
      icon: Clock,
      title: translations.expert_support,
      description: 'Always here to help'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative">
        <HeroSlider />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {translations.welcome_to_agricaptain}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {translations.your_farming_partner}
            </p>
            <div className="space-x-4">
              <Link to="/products">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                  {translations.browse_products}
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black text-lg px-8 py-3">
                {translations.get_started}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{translations.categories}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to={`/products?category=${category.name.toLowerCase()}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <Badge className={`${category.color} text-sm px-3 py-1`}>
                      {category.name}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">{translations.featured_products}</h2>
            <Link to="/products">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                View All <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onBuyNow={() => handleBuyNow(product)}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{translations.why_choose_us}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <feature.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{translations.special_offers}</h2>
          <p className="text-xl mb-8 opacity-90">Get up to 30% off on selected products</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{translations.quality_seeds}</h3>
              <p className="mb-4">Premium varieties for better yield</p>
              <Badge className="bg-orange-500 text-white">20% OFF</Badge>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{translations.organic_fertilizers}</h3>
              <p className="mb-4">Eco-friendly nutrition for crops</p>
              <Badge className="bg-orange-500 text-white">25% OFF</Badge>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{translations.modern_equipment}</h3>
              <p className="mb-4">Latest farming technology</p>
              <Badge className="bg-orange-500 text-white">30% OFF</Badge>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* UPI Payment Confirmation Dialog */}
      <UPIPaymentConfirmation
        open={upiPaymentOpen}
        onOpenChange={setUpiPaymentOpen}
        amount={selectedProduct?.price || 0}
        onPaymentComplete={handleUPIPaymentComplete}
        onRegularPayment={handleRegularPayment}
      />
    </div>
  );
};

export default Index;
