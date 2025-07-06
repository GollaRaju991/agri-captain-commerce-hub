
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X, MapPin, Bell } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import LogoutConfirmation from '@/components/LogoutConfirmation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const { items } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isUserMenuOpen && !target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  const handleSignOut = () => {
    setShowLogoutConfirmation(true);
    setIsUserMenuOpen(false);
  };

  const confirmLogout = async () => {
    await logout();
    setShowLogoutConfirmation(false);
    navigate('/');
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">AC</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">AgriCaptain</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-green-600 font-medium">Home</Link>
              <Link to="/products" className="text-gray-700 hover:text-green-600 font-medium">Products</Link>
              <Link to="/vehicle-rent" className="text-gray-700 hover:text-green-600 font-medium">Vehicle Rent</Link>
              <Link to="/farm-worker" className="text-gray-700 hover:text-green-600 font-medium">Farm Worker</Link>
              <Link to="/become-seller" className="text-gray-700 hover:text-green-600 font-medium">Become Seller</Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-700 hover:text-green-600">
                <Search className="h-5 w-5" />
              </button>
              <Link to="/notifications" className="text-gray-700 hover:text-green-600">
                <Bell className="h-5 w-5" />
              </Link>
              <Link to="/cart" className="text-gray-700 hover:text-green-600 relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <div className="relative user-menu-container">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm">{user.name || 'User'}</span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Orders
                      </Link>
                      <Link
                        to="/coupons"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Coupons
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">Home</Link>
              <Link to="/products" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">Products</Link>
              <Link to="/vehicle-rent" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">Vehicle Rent</Link>
              <Link to="/farm-worker" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">Farm Worker</Link>
              <Link to="/become-seller" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">Become Seller</Link>
              
              <div className="border-t pt-2">
                <Link to="/cart" className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart {itemCount > 0 && `(${itemCount})`}
                </Link>
                <Link to="/notifications" className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </Link>
                
                {user ? (
                  <>
                    <Link to="/profile" className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600">
                      <User className="h-5 w-5 mr-2" />
                      Profile
                    </Link>
                    <Link to="/orders" className="block px-3 py-2 text-gray-700 hover:text-green-600">Orders</Link>
                    <Link to="/coupons" className="block px-3 py-2 text-gray-700 hover:text-green-600">Coupons</Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="block px-3 py-2 text-green-600 font-medium"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <LogoutConfirmation
        isOpen={showLogoutConfirmation}
        onClose={() => setShowLogoutConfirmation(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
};

export default Header;
