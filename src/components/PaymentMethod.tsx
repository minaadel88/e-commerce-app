import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface PaymentMethodProps {
  total: number;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({ total }) => {
  const [loading, setLoading] = useState(false);

  const handleGooglePay = async () => {
    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Payment successful! Thank you for your purchase.');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 min-w-[300px]">
      <button
        onClick={handleGooglePay}
        disabled={loading}
        className="w-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white py-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center relative"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            
            Pay ${total.toFixed(2)}
          </>
        )}
      </button>

      <div className="flex justify-between items-center">
        <img
          src="https://th.bing.com/th/id/R.a4bd3202cecefadc1b07ee359f856780?rik=rLDO2zSNggmU4Q&pid=ImgRaw&r=0"
          alt="Mastercard"
          className="h-8"
        />
        <img
          src="https://th.bing.com/th/id/OIP.A3nmHV9x3EVEUdP6bRp4SQHaE0?rs=1&pid=ImgDetMain"
          alt="Visa"
          className="h-8"
        />
        <img
          src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg"
          alt="PayPal"
          className="h-8"
        />
        <img
          src="https://th.bing.com/th/id/OIP.OUsb_9ON8rtV5rS37vdzFwHaD7?rs=1&pid=ImgDetMain"
          alt="InstaPay"
          className="h-8"
        />
        <img
          src="https://th.bing.com/th/id/R.31e1f7ea145db4f4f1159959404e9dfb?rik=3B%2fE880LAJWdwg&pid=ImgRaw&r=0"
          alt="Vodafone Cash"
          className="h-8"
        />
      </div>
    </div>
  );
};
