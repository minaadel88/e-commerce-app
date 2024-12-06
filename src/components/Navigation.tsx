import React from 'react';
import { Link } from 'react-router-dom';
import { Store, ShoppingCart, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export const Navigation: React.FC = () => {
  const { state } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <Store className="h-8 w-8 text-blue-600 dark:text-blue-300" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                KiroShop
              </span>
            </Link>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">Home</Link>
                </li>
                <li>
                  <Link to="/products?category=products" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">All Products</Link>
                </li>
                
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {/* Theme toggle button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full focus:outline-none bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-800 dark:text-gray-100" />
              ) : (
                <Sun className="h-5 w-5 text-gray-800 dark:text-gray-100" />
              )}
            </button>

            {/* Cart Link */}
            <Link to="/cart" className="flex items-center">
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="ml-2 text-gray-600 dark:text-gray-300">
                ${state.total.toFixed(2)}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
