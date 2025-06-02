
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translations: Record<string, string>;
}

const translations = {
  en: {
    // Header
    'seeds': 'Seeds',
    'fertilizers': 'Fertilizers',
    'agriculture_products': 'Agriculture Products',
    'brands': 'Brands',
    'farm_worker': 'Farm Worker',
    'rent_vehicles': 'Rent Vehicles',
    'loans': 'Loans',
    'login': 'Login',
    'cart': 'Cart',
    'profile': 'Profile',
    
    // Common
    'search': 'Search',
    'add_to_cart': 'Add to Cart',
    'buy_now': 'Buy Now',
    'price': 'Price',
    'discount': 'Discount',
    'total': 'Total',
    'continue_shopping': 'Continue Shopping',
    'checkout': 'Checkout',
    'payment': 'Payment',
    'delivery': 'Delivery',
    
    // Cart & Checkout
    'shopping_cart': 'Shopping Cart',
    'order_summary': 'Order Summary',
    'subtotal': 'Subtotal',
    'delivery_charges': 'Delivery Charges',
    'platform_charges': 'Platform Charges',
    'discount_amount': 'Discount Amount',
    'upi_discount': 'UPI Discount (10%)',
    'place_order': 'Place Order',
    'pay_with_upi': 'Pay with UPI',
    'pay_with_emi': 'Pay with EMI',
    'cash_on_delivery': 'Cash on Delivery',
    
    // Address
    'shipping_address': 'Shipping Address',
    'full_name': 'Full Name',
    'phone_number': 'Phone Number',
    'pincode': 'PIN Code',
    'address': 'Address',
    'city': 'City',
    'state': 'State',
    'get_location': 'Get Current Location'
  },
  
  te: {
    // Header
    'seeds': 'విత్తనాలు',
    'fertilizers': 'ఎరువులు',
    'agriculture_products': 'వ్యవసాయ ఉత్పత్తులు',
    'brands': 'బ్రాండ్లు',
    'farm_worker': 'వ్యవసాయ కార్మికుడు',
    'rent_vehicles': 'వాహనాలు అద్దెకు',
    'loans': 'రుణాలు',
    'login': 'లాగిన్',
    'cart': 'కార్ట్',
    'profile': 'ప్రొఫైల్',
    
    // Common
    'search': 'వెతకండి',
    'add_to_cart': 'కార్ట్‌కు జోడించండి',
    'buy_now': 'ఇప్పుడే కొనండి',
    'price': 'ధర',
    'discount': 'తగ్గింపు',
    'total': 'మొత్తం',
    'continue_shopping': 'షాపింగ్ కొనసాగించండి',
    'checkout': 'చెక్‌అవుట్',
    'payment': 'చెల్లింపు',
    'delivery': 'డెలివరీ',
    
    // Cart & Checkout
    'shopping_cart': 'షాపింగ్ కార్ట్',
    'order_summary': 'ఆర్డర్ సారాంశం',
    'subtotal': 'ఉప మొత్తం',
    'delivery_charges': 'డెలివరీ ఛార్జీలు',
    'platform_charges': 'ప్లాట్‌ఫారమ్ ఛార్జీలు',
    'discount_amount': 'తగ్గింపు మొత్తం',
    'upi_discount': 'UPI తగ్గింపు (10%)',
    'place_order': 'ఆర్డర్ చేయండి',
    'pay_with_upi': 'UPI తో చెల్లించండి',
    'pay_with_emi': 'EMI తో చెల్లించండి',
    'cash_on_delivery': 'డెలివరీలో నగదు',
    
    // Address
    'shipping_address': 'షిప్పింగ్ చిరునామా',
    'full_name': 'పూర్తి పేరు',
    'phone_number': 'ఫోన్ నంబర్',
    'pincode': 'పిన్ కోడ్',
    'address': 'చిరునామా',
    'city': 'నగరం',
    'state': 'రాష్ట్రం',
    'get_location': 'ప్రస్తుత స్థానం పొందండి'
  },
  
  hi: {
    // Header
    'seeds': 'बीज',
    'fertilizers': 'उर्वरक',
    'agriculture_products': 'कृषि उत्पाद',
    'brands': 'ब्रांड्स',
    'farm_worker': 'खेत मजदूर',
    'rent_vehicles': 'वाहन किराए पर',
    'loans': 'ऋण',
    'login': 'लॉगिन',
    'cart': 'कार्ट',
    'profile': 'प्रोफाइल',
    
    // Common
    'search': 'खोजें',
    'add_to_cart': 'कार्ट में जोड़ें',
    'buy_now': 'अभी खरीदें',
    'price': 'मूल्य',
    'discount': 'छूट',
    'total': 'कुल',
    'continue_shopping': 'खरीदारी जारी रखें',
    'checkout': 'चेकआउट',
    'payment': 'भुगतान',
    'delivery': 'डिलीवरी',
    
    // Cart & Checkout
    'shopping_cart': 'शॉपिंग कार्ट',
    'order_summary': 'ऑर्डर सारांश',
    'subtotal': 'उप योग',
    'delivery_charges': 'डिलीवरी शुल्क',
    'platform_charges': 'प्लेटफॉर्म शुल्क',
    'discount_amount': 'छूट राशि',
    'upi_discount': 'UPI छूट (10%)',
    'place_order': 'ऑर्डर करें',
    'pay_with_upi': 'UPI से भुगतान करें',
    'pay_with_emi': 'EMI से भुगतान करें',
    'cash_on_delivery': 'डिलीवरी पर नकद',
    
    // Address
    'shipping_address': 'शिपिंग पता',
    'full_name': 'पूरा नाम',
    'phone_number': 'फोन नंबर',
    'pincode': 'पिन कोड',
    'address': 'पता',
    'city': 'शहर',
    'state': 'राज्य',
    'get_location': 'वर्तमान स्थान प्राप्त करें'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('agricaptain_language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('agricaptain_language', lang);
  };

  const currentTranslations = translations[language as keyof typeof translations] || translations.en;

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: handleSetLanguage,
      translations: currentTranslations
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
