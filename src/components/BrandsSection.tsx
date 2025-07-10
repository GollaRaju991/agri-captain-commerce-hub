import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const BrandsSection = () => {
  const { translations } = useLanguage();

  const brands = [
    { name: "Syngenta", logo: "https://i.postimg.cc/rwG5wdNn/Syngenta.png" },
    { name: "Janatha Agro", logo: "https://i.postimg.cc/xdRGtkkJ/janatha-Agro-Products-Logo.webp" },
    { name: "Bayer", logo: "https://i.postimg.cc/vmqMrzv4/BAYER.png" },
    { name: "Seminis", logo: "https://i.postimg.cc/28JJmtSj/Seminis.png" },
    { name: "Namdhari Seeds", logo: "https://i.postimg.cc/xdGFvTyq/nuziveedu-Seeds.webp" },
    { name: "Rallis India", logo: "https://i.postimg.cc/J7BxWzvg/rallis-Logo.webp" },
    { name: "Dhanuka", logo: "https://i.postimg.cc/PqPZz6kc/dhanuka-Logo.webp" },
    { name: "FMC", logo: "https://i.postimg.cc/dV0TwWD1/fmcLogo.webp" },
    { name: "UPL", logo: "https://i.postimg.cc/QdVVRHnK/uplLogo.webp" },
    { name: "Geolife", logo: "https://i.postimg.cc/FswQHzHL/geolife-Logo.webp" },
    { name: "Otla", logo: "https://i.postimg.cc/7LsFjZdh/otla-web-01.webp" },
    { name: "Dow AgroSciences", logo: "https://i.postimg.cc/fRb5pfN7/dowLogo.webp" },
    { name: "East-West Seed", logo: "https://i.postimg.cc/1Xj4tS83/ews-International-Logo.webp" },
    { name: "Indofil", logo: "https://i.postimg.cc/05F8bctj/indofil-Logo.webp" },
    { name: "Bali Yaan", logo: "https://i.postimg.cc/8Ccp79VF/Balwaan.webp" },
    { name: "Innov-On Seed", logo: "https://i.postimg.cc/7YLx6brH/known-You-Seed-Logo.webp" },
    { name: "PI Industries", logo: "https://i.postimg.cc/SRvHjScR/piLogo.webp" },
    { name: "VNR Seeds", logo: "https://i.postimg.cc/JzwdFdqf/vnrLogo.webp" },
    { name: "BASF", logo: "https://i.postimg.cc/5NJsqF2J/basfLogo.webp" },
    { name: "Crystal", logo: "https://i.postimg.cc/02t7M66c/crystal-Logo.webp" },
    { name: "UAL", logo: "https://i.postimg.cc/nhj9X3fh/UAL-logo.webp" },
    { name: "Multiplex", logo: "https://i.postimg.cc/GtmHdQjr/multiplex-Logo.webp" },
    { name: "Government", logo: "https://i.postimg.cc/zBJfFj6W/ecowealth-Logo.webp" },
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
