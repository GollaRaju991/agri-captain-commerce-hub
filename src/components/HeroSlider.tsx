
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    id: 1,
    title: "Premium Quality Seeds",
    subtitle: "Grow Your Success",
    description: "Discover our collection of high-yield, disease-resistant seeds for better harvests",
    image: "https://i.postimg.cc/pL0vy9Dt/head.png",
    cta: "Shop Seeds",
    bgColor: "from-green-600 to-green-800"
  },
  {
    id: 2,
    title: "Advanced Farm Equipment",
    subtitle: "Modern Farming Solutions",
    description: "Upgrade your farming with our latest machinery and equipment",
    image: "https://i.postimg.cc/qMTkKt8H/WEB-Brand-TCS-080725-en.webp",
    cta: "View Equipment",
    bgColor: "from-blue-600 to-blue-800"
  },
  {
    id: 3,
    title: "Organic Fertilizers",
    subtitle: "Nourish Your Crops",
    description: "Boost soil health and crop yield with our organic fertilizer range",
    image: "https://i.postimg.cc/02nqJVk7/Screenshot-2025-07-09-230107.png",
    cta: "Shop Fertilizers",
    bgColor: "from-purple-600 to-purple-800"
  },
  {
    id: 4,
    title: "Smart Irrigation Systems",
    subtitle: "Water Efficiently",
    description: "Save water and increase productivity with our smart irrigation solutions",
    image: "https://i.postimg.cc/nrx6XDNd/Chat-GPT-Image-2.png",
    cta: "Explore Systems",
    bgColor: "from-teal-600 to-teal-800"
  },
  {
    id: 5,
    title: "Seasonal Sale - Up to 50% Off",
    subtitle: "Limited Time Offer",
    description: "Don't miss out on amazing deals across all agricultural products",
    image: "https://i.postimg.cc/dV3gZvSK/header1.png",
    cta: "Shop Now",
    bgColor: "from-red-600 to-red-800"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[280px] sm:h-[320px] md:h-[400px] lg:h-[500px] overflow-hidden bg-gray-100">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className="relative w-full h-full">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} bg-opacity-60`} />
            
            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-2xl text-white">
                  <h3 className="text-sm md:text-base font-medium mb-2 text-yellow-300 animate-fade-in">
                    {slide.subtitle}
                  </h3>
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-sm md:text-lg mb-6 max-w-xl leading-relaxed animate-fade-in">
                    {slide.description}
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6 py-3 animate-fade-in"
                  >
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0 h-10 w-10 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0 h-10 w-10 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Circle Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-110 shadow-lg' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
