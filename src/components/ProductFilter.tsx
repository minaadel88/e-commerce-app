import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getCategories } from '../api/products';

interface ProductFilterProps {
  onFilterChange: (category: string) => void;
  onPriceFilterChange: (range: [number, number]) => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  onFilterChange,
  onPriceFilterChange,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [showCategories, setShowCategories] = useState(true);
  const [showPriceFilter, setShowPriceFilter] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="space-y-6">
      {/* Product Categories Section */}
      <div>
        <button 
          onClick={() => setShowCategories(!showCategories)}
          className="flex items-center justify-between w-full text-gray-600 dark:text-gray-300 mb-4"
        >
          <span className="font-medium">PRODUCT CATEGORIES</span>
          <ChevronDown className={`w-4 h-4 transform ${showCategories ? 'rotate-180' : ''}`} />
        </button>
        {showCategories && (
          <div className="space-y-2">
            <button
              onClick={() => onFilterChange('')}
              className="w-full text-left text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onFilterChange(category)}
                className="w-full text-left text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white capitalize"
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter Section */}
      <div>
        <button 
          onClick={() => setShowPriceFilter(!showPriceFilter)}
          className="flex items-center justify-between w-full text-gray-600 dark:text-gray-300 mb-4"
        >
          <span className="font-medium">FILTER BY PRICE</span>
          <ChevronDown className={`w-4 h-4 transform ${showPriceFilter ? 'rotate-180' : ''}`} />
        </button>
        {showPriceFilter && (
          <div className="space-y-2">
            {[
              { label: 'Under $50', range: [0, 50] },
              { label: '$50 - $100', range: [50, 100] },
              { label: '$100 - $200', range: [100, 200] },
              { label: 'Over $200', range: [200, Infinity] }
            ].map((option) => (
              <button
                key={option.label}
                onClick={() => onPriceFilterChange(option.range as [number, number])}
                className="w-full text-left text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
