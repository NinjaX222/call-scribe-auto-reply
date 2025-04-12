
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Mic, ListFilter, Settings } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t flex justify-around items-center">
      <Link to="/" className={`bottom-nav-item ${isActive('/') ? 'active' : ''}`}>
        <Home className="h-5 w-5" />
        <span className="text-xs mt-1">Home</span>
      </Link>
      
      <Link to="/greetings" className={`bottom-nav-item ${isActive('/greetings') ? 'active' : ''}`}>
        <Mic className="h-5 w-5" />
        <span className="text-xs mt-1">Greetings</span>
      </Link>
      
      <Link to="/logs" className={`bottom-nav-item ${isActive('/logs') ? 'active' : ''}`}>
        <ListFilter className="h-5 w-5" />
        <span className="text-xs mt-1">Logs</span>
      </Link>
      
      <Link to="/settings" className={`bottom-nav-item ${isActive('/settings') ? 'active' : ''}`}>
        <Settings className="h-5 w-5" />
        <span className="text-xs mt-1">Settings</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;
