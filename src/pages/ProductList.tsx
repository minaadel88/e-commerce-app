import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import { ProductCard } from '../components/ProductCard';
import { ProductFilter } from '../components/ProductFilter';
import { Product } from '../types/product';
import { Grid, List } from 'lucide-react';

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply price filter
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating.rate - a.rating.rate;
        default:
          return b.id - a.id; // Latest
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceRange, sortBy]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2 text-sm">
            {/* Optionally, you can add more content or filters here */}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span>Show:</span>
              <select 
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              >
                <option value={1}>1</option>
                <option value={3}>3</option>
                <option value={6}>6</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 ${viewMode === 'grid' ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-400'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 ${viewMode === 'list' ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-400'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            >
              <option value="latest">Sort by latest</option>
              <option value="price-low">Sort by price: low to high</option>
              <option value="price-high">Sort by price: high to low</option>
              <option value="rating">Sort by rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-1">
            <ProductFilter
              onFilterChange={setSelectedCategory}
              onPriceFilterChange={setPriceRange}
            />
          </div>

          <div className="col-span-3">
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {filteredProducts.slice(0, itemsPerPage).map(product => (
                <ProductCard key={product.id} product={product} index={0} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
