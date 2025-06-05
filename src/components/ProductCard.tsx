
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
    
    // Navigate to checkout and scroll to top
    navigate('/checkout');
    window.scrollTo(0, 0);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {product.discount && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-xs">
            {product.discount}% OFF
          </Badge>
        )}
        {product.inStock === false && (
          <Badge className="absolute top-2 right-2 bg-gray-500 text-xs">
            Out of Stock
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        <Link to={`/product/${product.id}`} className="flex-1">
          <h3 className="font-semibold text-base mb-2 line-clamp-2 hover:text-green-600 transition-colors">
            {product.name}
          </h3>
          
          {product.rating && (
            <div className="flex items-center mb-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm">{product.rating}</span>
              {product.reviews && (
                <span className="ml-1 text-xs text-gray-500">({product.reviews})</span>
              )}
            </div>
          )}
          
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold text-green-600">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          
          {product.description && (
            <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
          )}
        </Link>
        
        <div className="flex space-x-2 mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-xs"
            onClick={handleAddToCart}
            disabled={product.inStock === false}
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Add to Cart
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-green-600 hover:bg-green-700 text-xs"
            onClick={handleBuyNow}
            disabled={product.inStock === false}
          >
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
