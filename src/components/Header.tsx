
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Call Scribe';
      case '/greetings':
        return 'Greetings';
      case '/logs':
        return 'Call Logs';
      case '/settings':
        return 'Settings';
      default:
        return 'Call Scribe';
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <h1 className="text-xl font-semibold">{getTitle()}</h1>
      {location.pathname !== '/settings' && (
        <Button variant="ghost" size="icon" asChild>
          <Link to="/settings">
            <Settings className="h-5 w-5" />
          </Link>
        </Button>
      )}
    </header>
  );
};

export default Header;
