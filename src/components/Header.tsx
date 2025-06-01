import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Sprout, Droplets, Wrench, Tractor, Leaf, Package, ChevronDown, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

const categories = [
  {
    name: 'Greecolur',
    icon: Palette,
    path: '/products?category=greecolur',
    color: 'text-indigo-600',
    subcategories: [
      { name: 'Green Solutions', path: '/products?category=greecolur&type=green-solutions' },
      { name: 'Eco Products', path: '/products?category=greecolur&type=eco-products' },
      { name: 'Natural Colors', path: '/products?category=greecolur&type=natural-colors' },
      { name: 'Bio Enhancers', path: '/products?category=greecolur&type=bio-enhancers' },
      { name: 'Plant Nutrients', path: '/products?category=greecolur&type=plant-nutrients' },
      { name: 'Growth Promoters', path: '/products?category=greecolur&type=growth-promoters' }
    ]
  },
  {
    name: 'Seeds',
    icon: Sprout,
    path: '/products?category=seeds',
    color: 'text-green-600',
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
    color: 'text-blue-600',
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
    name: 'Tools',
    icon: Wrench,
    path: '/products?category=tools',
    color: 'text-orange-600',
    subcategories: [
      { name: 'Hand Tools', path: '/products?category=tools&type=hand' },
      { name: 'Cutting Tools', path: '/products?category=tools&type=cutting' },
      { name: 'Digging Tools', path: '/products?category=tools&type=digging' },
      { name: 'Watering Tools', path: '/products?category=tools&type=watering' },
      { name: 'Measuring Tools', path: '/products?category=tools&type=measuring' },
      { name: 'Power Tools', path: '/products?category=tools&type=power' }
    ]
  },
  {
    name: 'Equipment',
    icon: Tractor,
    path: '/products?category=equipment',
    color: 'text-red-600',
    subcategories: [
      { name: 'Tractors', path: '/products?category=equipment&type=tractors' },
      { name: 'Harvesters', path: '/products?category=equipment&type=harvesters' },
      { name: 'Tillers', path: '/products?category=equipment&type=tillers' },
      { name: 'Sprayers', path: '/products?category=equipment&type=sprayers' },
      { name: 'Irrigation Systems', path: '/products?category=equipment&type=irrigation' },
      { name: 'Greenhouse Equipment', path: '/products?category=equipment&type=greenhouse' }
    ]
  },
  {
    name: 'Organic',
    icon: Leaf,
    path: '/products?category=organic',
    color: 'text-emerald-600',
    subcategories: [
      { name: 'Organic Seeds', path: '/products?category=organic&type=seeds' },
      { name: 'Organic Fertilizers', path: '/products?category=organic&type=fertilizers' },
      { name: 'Organic Pesticides', path: '/products?category=organic&type=pesticides' },
      { name: 'Compost', path: '/products?category=organic&type=compost' },
      { name: 'Bio-stimulants', path: '/products?category=organic&type=biostimulants' },
      { name: 'Organic Amendments', path: '/products?category=organic&type=amendments' }
    ]
  },
  {
    name: 'Supplies',
    icon: Package,
    path: '/products?category=supplies',
    color: 'text-purple-600',
    subcategories: [
      { name: 'Pots & Containers', path: '/products?category=supplies&type=containers' },
      { name: 'Soil & Growing Media', path: '/products?category=supplies&type=soil' },
      { name: 'Plant Protection', path: '/products?category=supplies&type=protection' },
      { name: 'Garden Accessories', path: '/products?category=supplies&type=accessories' },
      { name: 'Storage Solutions', path: '/products?category=supplies&type=storage' },
      { name: 'Safety Equipment', path: '/products?category=supplies&type=safety' }
    ]
  }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  return (
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

      {/* Category Menu Bar with Sub-menus */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <NavigationMenu className="max-w-none">
            <NavigationMenuList className="flex space-x-2 py-2">
              {categories.map((category) => (
                <NavigationMenuItem key={category.name}>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-white data-[state=open]:bg-white group">
                    <div className="flex flex-col items-center space-y-1">
                      <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-green-50 group-data-[state=open]:bg-green-50 transition-colors`}>
                        <category.icon className={`h-5 w-5 ${category.color} group-hover:scale-110 transition-transform`} />
                      </div>
                      <span className="text-xs font-medium text-gray-700 group-hover:text-green-600 group-data-[state=open]:text-green-600 transition-colors">
                        {category.name}
                      </span>
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {category.subcategories.map((subcategory) => (
                        <NavigationMenuLink key={subcategory.name} asChild>
                          <Link
                            to={subcategory.path}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{subcategory.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
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

            {/* Mobile Category Menu with Expandable Sub-menus */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
              {categories.map((category) => (
                <div key={category.name} className="mb-3">
                  <Link
                    to={category.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <category.icon className={`h-5 w-5 ${category.color}`} />
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                  </Link>
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
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
