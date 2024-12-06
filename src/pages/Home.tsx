import React from 'react';
import { HeroBanner } from '../components/HeroBanner';
import { AboutSection } from '../components/AboutSection';
import { ContactSection } from '../components/ContactSection';

export const Home: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <HeroBanner />
      <AboutSection />
      <ContactSection />
    </div>
  );
};
