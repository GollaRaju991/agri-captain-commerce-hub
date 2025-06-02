
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Sprout, Droplets, Package, Tractor, Users, Car, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import FarmWorkerDialog from '@/components/FarmWorkerDialog';
import RentVehicleDialog from '@/components/RentVehicleDialog';

const categories = [
  {
    name: 'Seeds',
    icon: Sprout,
    path: '/products?category=seeds',
    color: 'text-white',
    subcategories: [
      { name: 'Vegetable Seeds', path: '/products?category=seeds&type=vegetable' },
      { name: 'Fruit Seeds', path: '/products?category=seeds&type=fruit' },
      { name: 'Flower Seeds', path: '/products?category=seeds&type=flower' },
      { name: 'Herb Seeds', path: '/products?category=seeds&type=herb' },
      { name: 'Grain Seeds', path: '/products?category=seeds&type=grain' },
      { name: 'Hybrid Seeds', path: '/products?category=seeds&type=hybrid' }
    ]
  },
  {
    name: 'Fertilizers',
    icon: Droplets,
    path: '/products?category=fertilizers',
    color: 'text-white',
    subcategories: [
      { name: 'Organic Fertilizers', path: '/products?category=fertilizers&type=organic' },
      { name: 'Chemical Fertilizers', path: '/products?category=fertilizers&type=chemical' },
      { name: 'Liquid Fertilizers', path: '/products?category=fertilizers&type=liquid' },
      { name: 'Granular Fertilizers', path: '/products?category=fertilizers&type=granular' },
      { name: 'Specialty Fertilizers', path: '/products?category=fertilizers&type=specialty' },
      { name: 'Micronutrients', path: '/products?category=fertilizers&type=micronutrients' }
    ]
  },
  {
    name: 'Agriculture Products',
    icon: Package,
    path: '/products?category=agriculture-products',
    color: 'text-white',
    subcategories: [
      { name: 'Pesticides', path: '/products?category=agriculture-products&type=pesticides' },
      { name: 'Herbicides', path: '/products?category=agriculture-products&type=herbicides' },
      { name: 'Fungicides', path: '/products?category=agriculture-products&type=fungicides' },
      { name: 'Growth Promoters', path: '/products?category=agriculture-products&type=growth-promoters' },
      { name: 'Soil Conditioners', path: '/products?category=agriculture-products&type=soil-conditioners' },
      { name: 'Plant Protection', path: '/products?category=agriculture-products&type=plant-protection' }
    ]
  },
  {
    name: 'Brands',
    icon: Package,
    path: '/products?category=brands',
    color: 'text-white',
    subcategories: [
      { name: 'Premium Brands', path: '/products?category=brands&type=premium' },
      { name: 'Local Brands', path: '/products?category=brands&type=local' },
      { name: 'International Brands', path: '/products?category=brands&type=international' },
      { name: 'Organic Brands', path: '/products?category=brands&type=organic' },
      { name: 'Budget Brands', path: '/products?category=brands&type=budget' },
      { name: 'Specialty Brands', path: '/products?category=brands&type=specialty' }
    ]
  },
  {
    name: 'Farm Worker',
    icon: Users,
    path: '#',
    color: 'text-white',
    isDialog: true,
    subcategories: []
  },
  {
    name: 'Rent Vehicles',
    icon: Car,
    path: '#',
    color: 'text-white',
    isDialog: true,
    subcategories: []
  },
  {
    name: 'Loans',
    icon: CreditCard,
    path: '/products?category=loans',
    color: 'text-white',
    subcategories: [
      { name: 'Crop Loans', path: '/products?category=loans&type=crop' },
      { name: 'Equipment Loans', path: '/products?category=loans&type=equipment' },
      { name: 'Land Loans', path: '/products?category=loans&type=land' },
      { name: 'Micro Finance', path: '/products?category=loans&type=micro-finance' },
      { name: 'Government Schemes', path: '/products?category=loans&type=government' },
      { name: 'Personal Loans', path: '/products?category=loans&type=personal' }
    ]
  }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFarmWorkerOpen, setIsFarmWorkerOpen] = useState(false);
  const [isRentVehicleOpen, setIsRentVehicleOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleCategoryClick = (category: any) => {
    if (category.name === 'Farm Worker') {
      setIsFarmWorkerOpen(true);
    } else if (category.name === 'Rent Vehicles') {
      setIsRentVehicleOpen(true);
    } else if (category.path !== '#') {
      navigate(category.path);
    }
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold text-green-600">AgriCaptain</span>
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for agricultural products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 h-10"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/products">
                <Button variant="ghost">Products</Button>
              </Link>
              
              {user ? (
                <div className="flex items-center space-x-2">
                  <Link to="/profile">
                    <Button variant="ghost" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      {user.name}
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}

              <Link to="/cart" className="relative">
                <Button variant="ghost" size="sm">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Category Menu Bar with Green Background */}
        <div className="bg-green-600 border-t border-green-700">
          <div className="container mx-auto px-4">
            <NavigationMenu className="max-w-none">
              <NavigationMenuList className="flex space-x-2 py-2">
                {categories.map((category) => (
                  <NavigationMenuItem key={category.name}>
                    {category.subcategories.length > 0 ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-green-500 data-[state=open]:bg-green-500 group text-white">
                          <div className="flex flex-col items-center space-y-1">
                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center group-hover:bg-green-400 group-data-[state=open]:bg-green-400 transition-colors">
                              <category.icon className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="text-xs font-medium text-white group-hover:text-green-100 group-data-[state=open]:text-green-100 transition-colors">
                              {category.name}
                            </span>
                          </div>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white">
                            {category.subcategories.map((subcategory) => (
                              <NavigationMenuLink key={subcategory.name} asChild>
                                <Link
                                  to={subcategory.path}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-green-50 hover:text-green-600 focus:bg-green-50 focus:text-green-600"
                                >
                                  <div className="text-sm font-medium leading-none">{subcategory.name}</div>
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <button
                        onClick={() => handleCategoryClick(category)}
                        className="bg-transparent hover:bg-green-500 data-[state=open]:bg-green-500 group text-white px-3 py-2 rounded-md transition-colors"
                      >
                        <div className="flex flex-col items-center space-y-1">
                          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center group-hover:bg-green-400 transition-colors">
                            <category.icon className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
                          </div>
                          <span className="text-xs font-medium text-white group-hover:text-green-100 transition-colors">
                            {category.name}
                          </span>
                        </div>
                      </button>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-4 space-y-2">
              <Link to="/products" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Products
                </Button>
              </Link>
              
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => { logout(); setIsMenuOpen(false); }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}

              <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart ({totalItems})
                </Button>
              </Link>

              {/* Mobile Category Menu */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
                {categories.map((category) => (
                  <div key={category.name} className="mb-3">
                    <button
                      onClick={() => {
                        handleCategoryClick(category);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <category.icon className={`h-5 w-5 text-green-600`} />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                    </button>
                    {category.subcategories.length > 0 && (
                      <div className="ml-8 mt-1 space-y-1">
                        {category.subcategories.slice(0, 3).map((subcategory) => (
                          <Link
                            key={subcategory.name}
                            to={subcategory.path}
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-xs text-gray-600 hover:text-green-600 py-1"
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Dialog Components */}
      <FarmWorkerDialog open={isFarmWorkerOpen} onOpenChange={setIsFarmWorkerOpen} />
      <RentVehicleDialog open={isRentVehicleOpen} onOpenChange={setIsRentVehicleOpen} />
    </>
  );
};

export default Header;
