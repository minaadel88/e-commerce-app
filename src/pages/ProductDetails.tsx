import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getProduct } from '../api/products';
import { useCart } from '../context/CartContext';
import { Product } from '../types/product';

export const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const { dispatch } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);  // state to toggle the size guide modal

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await getProduct(parseInt(id));
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      if (product.category === "men's clothing" || product.category === "women's clothing") {
        if (!selectedSize) {
          toast.error('Please select a size');
          return;
        }
      }
      dispatch({ type: 'ADD_ITEM', payload: { ...product, size: selectedSize } });
      toast.success('Added to cart!');
    }
  };

  const closeSizeGuide = () => setShowSizeGuide(false);  // Close the modal

  if (loading || !product) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Image Thumbnails */}
          <div className="col-span-1">
            <div className="space-y-4">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-full aspect-square border ${selectedImage === index ? 'border-black' : 'border-gray-200'}`}
                >
                  <img
                    src={product.image}
                    alt={`${product.title} view ${index + 1}`}
                    className="w-full h-full object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Main Image */}
          <div className="col-span-6">
            <div className="aspect-square">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="col-span-5 space-y-6">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-light">{product.title}</h1>
            </div>

            <div className="text-3xl">${product.price}</div>

            {/* Conditionally render Size Selector for Men's and Women's Clothing */}
            {(product.category === "men's clothing" || product.category === "women's clothing") && (
              <>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Size</span>
                    <button
                      onClick={() => setShowSizeGuide(true)}  // Show size guide modal
                      className="text-sm text-gray-600 dark:text-gray-400 underline"
                    >
                      Size Guide
                    </button>
                  </div>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  >
                    <option value="">Choose an option</option>
                    {['S', 'M', 'L', 'XL'].map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-3 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeSizeGuide}
        >
          <div
            className="bg-white dark:bg-gray-800 p-4 rounded-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeSizeGuide}
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-400"
            >
              X
            </button>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Size Guide</h2>
            <img
              src="https://images.squarespace-cdn.com/content/v1/5b50f82af93fd4b0da91a240/1551098226598-ANI00QWSK4MM0POW9ZXV/Product+Sheet.jpg"
              alt="Size Guide"
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};
