
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating?: number;
  reviews?: number;
  description: string;
  forUse: string;
}

interface ProductCardProps {
  product: Product;
  onBuyNow?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuyNow }) => {
  const { addItem } = useCart();
  const { translations } = useLanguage();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBuyNow) {
      onBuyNow(product);
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-white">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discountPercentage > 0 && (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white">
              {discountPercentage}% OFF
            </Badge>
          )}
          {product.rating && (
            <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center space-x-1 text-xs">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.rating}</span>
            </div>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link to={`/product/${product.id}`}>
          <div className="mb-3">
            <h3 className="font-semibold text-lg group-hover:text-green-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {product.description}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              <span className="font-medium">For:</span> {product.forUse}
            </p>
          </div>
        </Link>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-green-600">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          {product.reviews && (
            <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
          )}
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleAddToCart}
              variant="outline"
              size="sm"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {translations.add_to_cart}
            </Button>
            <Button
              onClick={handleBuyNow}
              size="sm"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
            >
              {translations.buy_now}
            </Button>
          </div>
          <div className="text-center">
            <Badge variant="outline" className="text-xs text-green-600 border-green-600">
              UPI Payment: Extra 10% OFF
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
