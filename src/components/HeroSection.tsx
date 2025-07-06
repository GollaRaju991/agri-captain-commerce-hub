
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-r from-blue-600 via-purple-600 to-purple-800 overflow-hidden">
      {/* Navigation dots indicator at bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === 2 ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
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
  );
};

export default HeroSection;
