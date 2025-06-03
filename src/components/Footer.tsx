
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Users, Gift } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { translations } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Referral Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Refer Friends & Earn ₹25</h3>
                <p className="text-green-100">Get ₹25 for each successful referral. 50 referrals = ₹1000 directly to your UPI!</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                <Gift className="h-4 w-4 inline mr-2" />
                Refer Now
              </button>
              <button className="border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-xl font-bold">AgriCaptain</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner in agriculture. We provide high-quality seeds, fertilizers, and farming tools to help you grow better crops.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{translations.quick_links || "Quick Links"}</h3>
            <ul className="space-y-2">
              <li><Link to="/products?category=seeds" className="text-gray-400 hover:text-white transition-colors">{translations.seeds || "Seeds"}</Link></li>
              <li><Link to="/products?category=fertilizers" className="text-gray-400 hover:text-white transition-colors">{translations.fertilizers || "Fertilizers"}</Link></li>
              <li><Link to="/products?category=agriculture" className="text-gray-400 hover:text-white transition-colors">{translations.agriculture_products || "Agriculture Tools"}</Link></li>
              <li><Link to="/products?category=brands" className="text-gray-400 hover:text-white transition-colors">{translations.brands || "Brands"}</Link></li>
              <li><Link to="/farm-worker" className="text-gray-400 hover:text-white transition-colors">{translations.farm_worker || "Farm Worker"}</Link></li>
              <li><Link to="/vehicle-rent" className="text-gray-400 hover:text-white transition-colors">{translations.rent_vehicles || "Rent Vehicles"}</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{translations.customer_service || "Customer Service"}</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">{translations.help_center || "Help Center"}</Link></li>
              <li><Link to="/returns" className="text-gray-400 hover:text-white transition-colors">{translations.returns || "Returns & Refunds"}</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">{translations.shipping || "Shipping Info"}</Link></li>
              <li><Link to="/track-order" className="text-gray-400 hover:text-white transition-colors">{translations.track_order || "Track Order"}</Link></li>
              <li><Link to="/bulk-orders" className="text-gray-400 hover:text-white transition-colors">{translations.bulk_orders || "Bulk Orders"}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{translations.contact_us || "Contact Us"}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-gray-400">9912365550</p>
                  <p className="text-sm text-gray-500">Mon-Sat 9AM-7PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-gray-400">contactagricaptain@gmail.com</p>
                  <p className="text-sm text-gray-500">24/7 Support</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-gray-400">Nanakramguda Rd, Financial District</p>
                  <p className="text-gray-400">Serilingampalle (M), Hyderabad</p>
                  <p className="text-gray-400">Telangana 500032</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 AgriCaptain. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                {translations.privacy_policy || "Privacy Policy"}
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                {translations.terms || "Terms of Service"}
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                {translations.cookies || "Cookie Policy"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
