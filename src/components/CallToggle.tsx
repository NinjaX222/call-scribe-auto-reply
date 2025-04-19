
import React, { useState } from 'react';
import { Phone, PhoneOff, Clock } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const CallToggle: React.FC = () => {
  const [active, setActive] = useState(false);
  const [responseDelay, setResponseDelay] = useState(20);

  const toggleActive = () => {
    setActive(!active);
    if (!active) {
      toast.success('Auto-reply service activated!');
    } else {
      toast.info('Auto-reply service deactivated');
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <Card className="w-[90%] p-4 mb-6 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium">Auto-Reply Service</h2>
            <p className="text-sm text-muted-foreground">
              {active ? 'Service is active' : 'Service is inactive'}
            </p>
          </div>
          <Switch checked={active} onCheckedChange={toggleActive} />
        </div>
        
        <div className="flex items-center mt-4 gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Responds after {responseDelay} seconds
          </span>
        </div>
      </Card>
      
      <button 
        className={`call-button ${active ? 'call-button-active' : 'call-button-inactive'}`}
        onClick={toggleActive}
      >
        {active ? (
          <Phone className="h-8 w-8" />
        ) : (
          <PhoneOff className="h-8 w-8" />
        )}
      </button>
      <p className="mt-3 text-sm font-medium">
        {active ? 'Auto-Reply Active' : 'Auto-Reply Inactive'}
      </p>
    </div>
  );
};

export default CallToggle;
