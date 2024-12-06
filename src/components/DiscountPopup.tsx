import React, { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

export const DiscountPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const discountCode = 'SAVE5' + Math.random().toString(36).substring(2, 7).toUpperCase();
    toast.success(`Discount code ${discountCode} sent to ${email}!`);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed bottom-8 left-8 bg-black text-white rounded-full shadow-lg z-50 transition-all duration-300 ${
        isExpanded ? 'w-64 h-auto p-6' : 'w-24 h-24 cursor-pointer'
      }`}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(false);
        }}
        className="absolute -top-2 -right-2 bg-black rounded-full p-1 z-10"
      >
        <X className="w-4 h-4" />
      </button>

      {!isExpanded ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="font-bold text-lg">GET 5%</div>
            <div className="text-sm">OFF</div>
          </div>
        </div>
      ) : (
        <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
          <h3 className="text-lg font-bold text-center">GET 5% OFF</h3>
          <p className="text-sm text-center">Subscribe to get your discount code</p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 text-black rounded-md text-sm"
            />
            <button
              type="submit"
              className="w-full bg-white text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Discount
            </button>
          </form>
        </div>
      )}
    </div>
  );
};