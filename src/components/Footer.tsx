
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Gift } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-xl font-bold">AgriCaptain</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for quality agricultural products and farming solutions.
              Empowering farmers and agricultural businesses across the nation.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-400 hover:text-green-400 transition-colors">All Products</Link></li>
              <li><Link to="/products?category=seeds" className="text-gray-400 hover:text-green-400 transition-colors">Seeds</Link></li>
              <li><Link to="/products?category=fertilizers" className="text-gray-400 hover:text-green-400 transition-colors">Fertilizers</Link></li>
              <li><Link to="/products?category=tools" className="text-gray-400 hover:text-green-400 transition-colors">Tools</Link></li>
              <li><Link to="/products?category=equipment" className="text-gray-400 hover:text-green-400 transition-colors">Equipment</Link></li>
            </ul>
          </div>

          {/* Customer Service & Referral */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Track Your Order</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Shipping Info</a></li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors flex items-center">
                  <Gift className="h-4 w-4 mr-1" />
                  Refer & Earn ₹25
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400" />
                <span className="text-gray-400">9912365550</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400" />
                <span className="text-gray-400">contactagricaptain@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-400 mt-1" />
                <span className="text-gray-400">
                  Nanakramguda Rd, Financial District, Serilingampalle (M), Hyderabad, Telangana 500032
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 AgriCaptain. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
