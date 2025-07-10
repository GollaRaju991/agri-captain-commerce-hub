import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const BrandsSection = () => {
  const { translations } = useLanguage();

  const brands = [
    { name: "Tapas", logo: "https://i.postimg.cc/3JWqNt9X/tapas.png" },
    { name: "Syngenta", logo: "https://i.postimg.cc/RZNvxbPV/syngenta.png" },
    { name: "Janatha Agro", logo: "https://i.postimg.cc/YqKtdVKH/janatha.png" },
    { name: "Bayer", logo: "https://i.postimg.cc/Ls5g7DQP/bayer.png" },
    { name: "Seminis", logo: "https://i.postimg.cc/fTMw2qJM/seminis.png" },
    { name: "Namdhari Seeds", logo: "https://i.postimg.cc/7h9QqxTP/namdhari.png" },
    { name: "Rallis India", logo: "https://i.postimg.cc/J7kLPNfb/rallis.png" },
    { name: "Dhanuka", logo: "https://i.postimg.cc/wMHYrQVF/dhanuka.png" },
    { name: "FMC", logo: "https://i.postimg.cc/Sxr0m4B6/fmc.png" },
    { name: "UPL", logo: "https://i.postimg.cc/BnG3xK5P/upl.png" },
    { name: "Geolife", logo: "https://i.postimg.cc/J7kLPNfb/geolife.png" },
    { name: "Otla", logo: "https://i.postimg.cc/wMHYrQVF/otla.png" },
    { name: "Dow AgroSciences", logo: "https://i.postimg.cc/BnG3xK5P/dow.png" },
    { name: "East-West Seed", logo: "https://i.postimg.cc/J7kLPNfb/eastwest.png" },
    { name: "Indofil", logo: "https://i.postimg.cc/wMHYrQVF/indofil.png" },
    { name: "Bali Yaan", logo: "https://i.postimg.cc/BnG3xK5P/baliyaan.png" },
    { name: "Innov-On Seed", logo: "https://i.postimg.cc/3JWqNt9X/innovon.png" },
    { name: "PI Industries", logo: "https://i.postimg.cc/RZNvxbPV/pi.png" },
    { name: "VNR Seeds", logo: "https://i.postimg.cc/YqKtdVKH/vnr.png" },
    { name: "BASF", logo: "https://i.postimg.cc/Ls5g7DQP/basf.png" },
    { name: "Crystal", logo: "https://i.postimg.cc/fTMw2qJM/crystal.png" },
    { name: "UAL", logo: "https://i.postimg.cc/7h9QqxTP/ual.png" },
    { name: "Multiplex", logo: "https://i.postimg.cc/J7kLPNfb/multiplex.png" },
    { name: "Government", logo: "https://i.postimg.cc/wMHYrQVF/govt.png" },
    { name: "Shree Ganga", logo: "https://i.postimg.cc/3JWqNt9X/shreeganga.png" },
    { name: "Keep It Fresh", logo: "https://i.postimg.cc/RZNvxbPV/keepfresh.png" },
    { name: "Nitya", logo: "https://i.postimg.cc/YqKtdVKH/nitya.png" },
    { name: "Netafim", logo: "https://i.postimg.cc/Ls5g7DQP/netafim.png" },
    { name: "Farm-Tech", logo: "https://i.postimg.cc/fTMw2qJM/farmtech.png" },
    { name: "Rahuja Solar", logo: "https://i.postimg.cc/7h9QqxTP/rahuja.png" },
    { name: "VEF", logo: "https://i.postimg.cc/J7kLPNfb/vef.png" },
    { name: "AEF", logo: "https://i.postimg.cc/wMHYrQVF/aef.png" },
    { name: "Ashok Seeds", logo: "https://i.postimg.cc/3JWqNt9X/ashok.png" },
    { name: "Bioseed", logo: "https://i.postimg.cc/RZNvxbPV/bioseed.png" },
    { name: "Clause", logo: "https://i.postimg.cc/YqKtdVKH/clause.png" },
    { name: "Pioneer", logo: "https://i.postimg.cc/Ls5g7DQP/pioneer.png" },
    { name: "Farming", logo: "https://i.postimg.cc/fTMw2qJM/farming.png" },
    { name: "Iffco", logo: "https://i.postimg.cc/7h9QqxTP/iffco.png" },
    { name: "FSD", logo: "https://i.postimg.cc/J7kLPNfb/fsd.png" },
    { name: "Indus", logo: "https://i.postimg.cc/wMHYrQVF/indus.png" }
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