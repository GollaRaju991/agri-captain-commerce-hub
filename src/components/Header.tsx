
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Languages,
  Sprout,
  Beaker,
  Tractor,
  Award,
  Users,
  Truck,
  CreditCard
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import FarmWorkerDialog from './FarmWorkerDialog';
import RentVehicleDialog from './RentVehicleDialog';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const navigate = useNavigate();
  const { items } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [farmWorkerDialogOpen, setFarmWorkerDialogOpen] = useState(false);
  const [rentVehicleDialogOpen, setRentVehicleDialogOpen] = useState(false);
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const menuItems = [
    {
      name: 'Seeds',
      href: '/products?category=seeds',
      icon: Sprout,
      submenu: [
        'Vegetable Seeds',
        'Flower Seeds', 
        'Fruit Seeds',
        'Grain Seeds',
        'Herb Seeds'
      ]
    },
    {
      name: 'Fertilizers',
      href: '/products?category=fertilizers',
      icon: Beaker,
      submenu: [
        'Organic Fertilizers',
        'Chemical Fertilizers',
        'Bio Fertilizers',
        'Liquid Fertilizers',
        'Granular Fertilizers'
      ]
    },
    {
      name: 'Agriculture Products',
      href: '/products?category=agriculture',
      icon: Tractor,
      submenu: [
        'Pesticides',
        'Insecticides',
        'Fungicides',
        'Herbicides',
        'Plant Growth Regulators'
      ]
    },
    {
      name: 'Brands',
      href: '/products?category=brands',
      icon: Award,
      submenu: [
        'Tata Rallis',
        'UPL Limited',
        'Bayer CropScience',
        'Syngenta',
        'BASF'
      ]
    },
    {
      name: 'Farm Worker',
      action: () => setFarmWorkerDialogOpen(true),
      icon: Users
    },
    {
      name: 'Rent Vehicles',
      action: () => setRentVehicleDialogOpen(true),
      icon: Truck
    },
    {
      name: 'Loans',
      href: '/products?category=loans',
      icon: CreditCard,
      submenu: [
        'Crop Loans',
        'Equipment Loans',
        'Land Purchase Loans',
        'Working Capital Loans'
      ]
    }
  ];

  // Show language selector on first visit
  useEffect(() => {
    const hasSelectedLanguage = localStorage.getItem('selectedLanguage');
    if (!hasSelectedLanguage) {
      setLanguageDialogOpen(true);
    } else {
      setCurrentLanguage(hasSelectedLanguage);
    }
  }, []);

  const handleLanguageSelect = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language);
    console.log('Language selected:', language);
  };

  return (
    <>
      {/* Top Header */}
      <div className="bg-green-800 text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              +91 9876543210
            </span>
            <span className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              support@agricaptain.com
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              Free Delivery All Over India
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguageDialogOpen(true)}
              className="text-white hover:text-white hover:bg-green-700 h-8 px-2"
            >
              <Languages className="h-4 w-4 mr-1" />
              Language
            </Button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold text-green-600">AgriCaptain</span>
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="flex w-full">
                <Input
                  type="text"
                  placeholder="Search for seeds, fertilizers, tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-r-none border-r-0 focus:ring-green-500 focus:border-green-500"
                />
                <Button 
                  type="submit"
                  className="rounded-l-none bg-green-600 hover:bg-green-700"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => {/* Could implement mobile search modal */}}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <Link to="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-green-600 text-xs">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                    className="flex items-center space-x-1"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden md:inline">{user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  {activeDropdown === 'user' && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setActiveDropdown(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:block border-t border-gray-200">
            <div className="flex space-x-1 bg-green-600">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="relative group"
                    onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="flex items-center space-x-2 px-4 py-3 text-sm font-medium text-white hover:bg-green-700 transition-colors"
                      >
                        <IconComponent className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    ) : (
                      <button
                        onClick={item.action}
                        className="flex items-center space-x-2 px-4 py-3 text-sm font-medium text-white hover:bg-green-700 transition-colors"
                      >
                        <IconComponent className="h-4 w-4" />
                        <span>{item.name}</span>
                      </button>
                    )}
                    
                    {/* Submenu */}
                    {activeDropdown === item.name && item.submenu && (
                      <div className="absolute top-full left-0 mt-0 w-56 bg-white rounded-md shadow-lg py-1 z-50 border">
                        {item.submenu.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                          >
                            {subItem}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Mobile Search Bar */}
          <div className="lg:hidden py-4 border-t border-gray-200">
            <form onSubmit={handleSearch} className="flex">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none border-r-0"
              />
              <Button type="submit" className="rounded-l-none bg-green-600 hover:bg-green-700">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-2">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index}>
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="flex items-center space-x-2 py-2 text-gray-700 hover:text-green-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <IconComponent className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          item.action?.();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 w-full text-left py-2 text-gray-700 hover:text-green-600"
                      >
                        <IconComponent className="h-4 w-4" />
                        <span>{item.name}</span>
                      </button>
                    )}
                    
                    {item.submenu && (
                      <div className="ml-6 space-y-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href="#"
                            className="block py-1 text-sm text-gray-600 hover:text-green-600"
                          >
                            {subItem}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Dialog Components */}
      <FarmWorkerDialog 
        open={farmWorkerDialogOpen} 
        onOpenChange={setFarmWorkerDialogOpen}
      />
      <RentVehicleDialog 
        open={rentVehicleDialogOpen} 
        onOpenChange={setRentVehicleDialogOpen}
      />
      <LanguageSelector
        open={languageDialogOpen}
        onOpenChange={setLanguageDialogOpen}
        onLanguageSelect={handleLanguageSelect}
      />
    </>
  );
};

export default Header;
