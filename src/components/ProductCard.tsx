
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  rating?: number;
  reviews?: number;
  discount?: number;
  inStock?: boolean;
  description?: string;
  forUse?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category || 'General'
    });
    
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    // Add to cart first
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category || 'General'
    });
    
    // Navigate to cart page and scroll to top
    navigate('/cart');
    window.scrollTo(0, 0);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col mobile-card">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-32 md:h-48 object-cover rounded-t-lg"
        />
        {product.discount && (
          <Badge className="absolute top-1 left-1 bg-red-500 text-xs px-1 py-0.5">
            {product.discount}% OFF
          </Badge>
        )}
        {product.inStock === false && (
          <Badge className="absolute top-1 right-1 bg-gray-500 text-xs px-1 py-0.5">
            Out of Stock
          </Badge>
        )}
      </div>
      
      <CardContent className="p-2 md:p-4 flex-1 flex flex-col">
        <Link to={`/product/${product.id}`} className="flex-1">
          <h3 className="font-semibold text-xs md:text-base mb-1 md:mb-2 line-clamp-2 hover:text-green-600 transition-colors leading-tight">
            {product.name}
          </h3>
          
          {product.rating && (
            <div className="flex items-center mb-1 md:mb-2">
              <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-xs md:text-sm">{product.rating}</span>
              {product.reviews && (
                <span className="ml-1 text-xs text-gray-500 hidden md:inline">({product.reviews})</span>
              )}
            </div>
          )}
          
          <div className="flex items-center space-x-1 md:space-x-2 mb-2 md:mb-3">
            <span className="text-sm md:text-lg font-bold text-green-600">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs md:text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          
          {product.description && (
            <p className="text-xs text-gray-600 mb-1 md:mb-2 line-clamp-2 hidden md:block">{product.description}</p>
          )}
        </Link>
        
        <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-2 mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs py-2 md:py-2 mobile-button"
            onClick={handleAddToCart}
            disabled={product.inStock === false}
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            <span className="hidden md:inline">Add to Cart</span>
            <span className="md:hidden">Add</span>
          </Button>
          <Button 
            size="sm" 
            className="w-full bg-green-600 hover:bg-green-700 text-xs py-2 md:py-2 mobile-button"
            onClick={handleBuyNow}
            disabled={product.inStock === false}
          >
            <span className="hidden md:inline">Buy Now</span>
            <span className="md:hidden">Buy</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
