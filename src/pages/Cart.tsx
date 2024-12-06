import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PaymentMethod } from '../components/PaymentMethod';

export const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const [showPayment, setShowPayment] = useState(false);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Add some products to your cart to see them here.</p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h2>
      
      <div className="space-y-6">
        {state.items.map(item => (
          <div key={item.id} className="flex items-center space-x-4 py-4 border-b dark:border-gray-700">
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-contain"
            />
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">${item.price.toFixed(2)}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            
            <button
              onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
              className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-between items-start">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500"
        >
          Continue Shopping
        </Link>
        
        <div className="text-right">
          <div className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Total: <span className="font-bold text-gray-900 dark:text-white">${state.total.toFixed(2)}</span>
          </div>
          {!showPayment ? (
            <button
              onClick={() => setShowPayment(true)}
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Proceed to Checkout
            </button>
          ) : (
            <PaymentMethod total={state.total} />
          )}
        </div>
      </div>
    </div>
  );
};
