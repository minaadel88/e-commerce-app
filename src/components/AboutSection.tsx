import React from 'react';
import { Shield, Truck, RefreshCw } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Shopping',
      description: 'Your security is our top priority. Shop with confidence using our secure payment system.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Get your orders delivered quickly and efficiently to your doorstep.'
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      description: '30-day return policy for a hassle-free shopping experience.'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Us</h2>
        <p className="text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
          We're committed to providing the best shopping experience with quality products and exceptional service.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((feature) => (
          <div key={feature.title} className="text-center">
            <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-200">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
