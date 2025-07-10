import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const BrandsSection = () => {
  const { translations } = useLanguage();

  const brands = [
    { name: "Syngenta", logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop&crop=center" },
    { name: "Janatha Agro", logo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop&crop=center" },
    { name: "Bayer", logo: "https://i.postimg.cc/vmqMrzv4/BAYER.png" },
    { name: "Seminis", logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=100&fit=crop&crop=center" },
    { name: "Namdhari Seeds", logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100&h=100&fit=crop&crop=center" },
    { name: "Rallis India", logo: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=100&h=100&fit=crop&crop=center" },
    { name: "Dhanuka", logo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&h=100&fit=crop&crop=center" },
    { name: "FMC", logo: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=100&h=100&fit=crop&crop=center" },
    { name: "UPL", logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop&crop=center" },
    { name: "Geolife", logo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop&crop=center" },
    { name: "Otla", logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=center" },
    { name: "Dow AgroSciences", logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=100&fit=crop&crop=center" },
    { name: "East-West Seed", logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100&h=100&fit=crop&crop=center" },
    { name: "Indofil", logo: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=100&h=100&fit=crop&crop=center" },
    { name: "Bali Yaan", logo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&h=100&fit=crop&crop=center" },
    { name: "Innov-On Seed", logo: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=100&h=100&fit=crop&crop=center" },
    { name: "PI Industries", logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop&crop=center" },
    { name: "VNR Seeds", logo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop&crop=center" },
    { name: "BASF", logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=center" },
    { name: "Crystal", logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=100&fit=crop&crop=center" },
    { name: "UAL", logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100&h=100&fit=crop&crop=center" },
    { name: "Multiplex", logo: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=100&h=100&fit=crop&crop=center" },
    { name: "Government", logo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&h=100&fit=crop&crop=center" },
    { name: "Shree Ganga", logo: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=100&h=100&fit=crop&crop=center" },
    { name: "Keep It Fresh", logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop&crop=center" },
    { name: "Nitya", logo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop&crop=center" },
    { name: "Netafim", logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=center" },
    { name: "Farm-Tech", logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=100&fit=crop&crop=center" },
    { name: "Rahuja Solar", logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100&h=100&fit=crop&crop=center" },
    { name: "VEF", logo: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=100&h=100&fit=crop&crop=center" },
    { name: "AEF", logo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&h=100&fit=crop&crop=center" },
    { name: "Ashok Seeds", logo: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=100&h=100&fit=crop&crop=center" },
    { name: "Bioseed", logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop&crop=center" },
    { name: "Clause", logo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop&crop=center" },
    { name: "Pioneer", logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=center" },
    { name: "Farming", logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=100&fit=crop&crop=center" },
    { name: "Iffco", logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100&h=100&fit=crop&crop=center" },
    { name: "FSD", logo: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=100&h=100&fit=crop&crop=center" },
    { name: "Indus", logo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&h=100&fit=crop&crop=center" }
  ];

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {translations.trusted_brands || "Trusted Brands"}
          </h2>
          <p className="text-gray-600">
            {translations.premium_brands || "Premium agricultural brands you can trust"}
          </p>
        </div>
        
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 md:gap-4">
          {brands.map((brand, index) => (
            <Card key={index} className="hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer border-gray-200">
              <CardContent className="p-2 md:p-3">
                <div className="w-full h-12 md:h-16 flex items-center justify-center">
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
