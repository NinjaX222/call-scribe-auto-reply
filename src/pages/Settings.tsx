
import React from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import Settings from '@/components/Settings';

const SettingsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background pb-16">
      <Header />
      <Settings />
      <BottomNavigation />
    </div>
  );
};

export default SettingsPage;
