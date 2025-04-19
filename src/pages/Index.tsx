
import React from 'react';
import Header from '@/components/Header';
import CallToggle from '@/components/CallToggle';
import BottomNavigation from '@/components/BottomNavigation';
import { Card } from '@/components/ui/card';
import { PhoneIncoming, PhoneOff, Clock, MessageSquare } from 'lucide-react';

const Index: React.FC = () => {
  // Mock statistics
  const stats = [
    { id: 1, label: 'Calls Handled', value: 12, icon: PhoneIncoming },
    { id: 2, label: 'Missed Calls', value: 3, icon: PhoneOff },
    { id: 3, label: 'Avg. Response', value: '20s', icon: Clock },
    { id: 4, label: 'Messages', value: 8, icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16">
      <Header />
      
      <CallToggle />
      
      <div className="mt-8 px-4">
        <h2 className="text-lg font-medium mb-3">Statistics</h2>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <Card key={stat.id} className="p-3 flex flex-col items-center">
              <div className="bg-primary/10 p-2 rounded-full">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-semibold mt-2">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mt-6 px-4">
        <Card className="p-4 bg-primary text-primary-foreground">
          <h3 className="font-medium">Quick Tip</h3>
          <p className="text-sm mt-1">
            Record multiple greeting messages for different situations: work hours, 
            after hours, driving, and meetings.
          </p>
        </Card>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
