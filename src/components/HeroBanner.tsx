import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const images = [
  {
    src: "/1.jpeg",
    title: "New Arrivals",
    description: "New Arrivals are Here! Explore the Latest Trends in Fashion and Electronics Today!",
  },
  {
    src: "/2.jpeg",
    title: "BIG SALE",
    description: "Black Friday Mega Deals! Up to 70% Off on Your Favorite Products. Shop Now Before It's Too Late",
  },
  {
    src: "/3.jpeg",
    title: "Refresh Your Wardrobe",
    description: "Discover the Best for Everyone! Shop Men’s, Women’s, and Electronics Collections Now!",
  },
];

export const HeroBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[600px] bg-gray-100 dark:bg-gray-900 overflow-hidden">
      
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>

      
      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="max-w-xl animate-fadeIn p-6 rounded-lg shadow-lg">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {images[currentIndex].title}
          </h1>
          
          <p className="text-xl text-gray-800 dark:text-gray-200 mb-8 border-4 border-gray-900 dark:border-white p-4 rounded-md bg-gray-200 dark:bg-gray-700">
            {images[currentIndex].description}
          </p>
          <Link
            to="/products"
            className="inline-flex bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-8 py-3 rounded-md font-semibold items-center space-x-2 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full ${index === currentIndex ? "bg-gray-900 dark:bg-white" : "bg-gray-500 dark:bg-gray-700"} transition-all duration-300`}
          ></button>
        ))}
      </div>
    </div>
  );
};
