import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Sprout, Beaker, Tractor, Award, Wrench, Wheat, Scissors, Droplets } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ProductCategories = () => {
  const { translations } = useLanguage();

  const categories = [
    {
      name: translations.seeds || "Seeds",
      icon: Sprout,
      href: '/products?category=seeds',
      color: 'bg-green-100 text-green-600',
      description: "High quality seeds for all crops"
    },
    {
      name: translations.fertilizers || "Fertilizers",
      icon: Beaker,
      href: '/products?category=fertilizers',
      color: 'bg-blue-100 text-blue-600',
      description: "Organic & chemical fertilizers"
    },
    {
      name: "Pesticides",
      icon: Droplets,
      href: '/products?category=pesticides',
      color: 'bg-red-100 text-red-600',
      description: "Crop protection solutions"
    },
    {
      name: "Farm Tools",
      icon: Wrench,
      href: '/products?category=tools',
      color: 'bg-orange-100 text-orange-600',
      description: "Essential farming equipment"
    },
    {
      name: "Irrigation",
      icon: Droplets,
      href: '/products?category=irrigation',
      color: 'bg-cyan-100 text-cyan-600',
      description: "Water management systems"
    },
    {
      name: "Machinery",
      icon: Tractor,
      href: '/products?category=machinery',
      color: 'bg-purple-100 text-purple-600',
      description: "Agricultural machinery"
    },
    {
      name: "Crop Care",
      icon: Scissors,
      href: '/products?category=cropcare',
      color: 'bg-pink-100 text-pink-600',
      description: "Plant care products"
    },
    {
      name: "Grains",
      icon: Wheat,
      href: '/products?category=grains',
      color: 'bg-yellow-100 text-yellow-600',
      description: "Quality grain products"
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {translations.shop_by_category || "Shop by Category"}
          </h2>
          <p className="text-gray-600">
            {translations.browse_categories || "Browse our wide range of agricultural categories"}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Link key={index} to={category.href}>
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                  <CardContent className="p-4 md:p-6">
                    <div className={`w-12 h-12 md:w-16 md:h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <IconComponent className="h-6 w-6 md:h-8 md:w-8" />
                    </div>
                    <h3 className="font-semibold text-sm md:text-base mb-2">{category.name}</h3>
                    <p className="text-xs text-gray-500 hidden md:block">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;