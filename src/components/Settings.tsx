
import React, { useState } from 'react';
import { 
  Clock, 
  MessageSquare, 
  Languages,
  Phone,
  Bell,
  Smartphone,
  Save
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from '@/components/ui/select';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const [responseDelay, setResponseDelay] = useState<number[]>([20]);
  const [language, setLanguage] = useState('english');
  const [phoneNumber, setPhoneNumber] = useState('+1234567890');
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSaveSettings = () => {
    // This would save the settings to storage in a real app
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="p-4 pb-20">
      <div className="space-y-4">
        <Card className="p-4">
          <h3 className="flex items-center text-lg font-medium mb-4">
            <Clock className="h-5 w-5 mr-2" />
            Response Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Response Delay</Label>
                <span className="text-sm font-medium">{responseDelay[0]} seconds</span>
              </div>
              <Slider 
                value={responseDelay}
                onValueChange={setResponseDelay}
                min={5}
                max={60}
                step={1}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Time to wait before auto-responding to calls
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="flex items-center text-lg font-medium mb-4">
            <Languages className="h-5 w-5 mr-2" />
            Language Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="language" className="mb-2 block">Interface Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="arabic">العربية (Arabic)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="flex items-center text-lg font-medium mb-4">
            <MessageSquare className="h-5 w-5 mr-2" />
            SMS Forwarding
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-toggle">Forward messages via SMS</Label>
              <Switch 
                id="sms-toggle"
                checked={smsEnabled} 
                onCheckedChange={setSmsEnabled} 
              />
            </div>
            
            {smsEnabled && (
              <div>
                <Label htmlFor="phone-number" className="mb-2 block">Phone Number</Label>
                <Input 
                  id="phone-number"
                  placeholder="Enter phone number" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  SMS with caller messages will be sent to this number
                </p>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="flex items-center text-lg font-medium mb-4">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </h3>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="notification-toggle">Enable notifications</Label>
            <Switch 
              id="notification-toggle"
              checked={notificationsEnabled} 
              onCheckedChange={setNotificationsEnabled} 
            />
          </div>
        </Card>
        
        <Button 
          className="w-full mt-6"
          onClick={handleSaveSettings}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
