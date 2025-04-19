
import React from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import GreetingRecorder from '@/components/GreetingRecorder';
import { Card } from '@/components/ui/card';
import { Play, Edit, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Mock greeting data
const savedGreetings = [
  { id: '1', name: 'Default Greeting', duration: '0:12' },
  { id: '2', name: 'Work Hours', duration: '0:15' },
  { id: '3', name: 'Meetings', duration: '0:10' },
  { id: '4', name: 'Driving', duration: '0:08' },
];

const Greetings: React.FC = () => {
  const [activeGreeting, setActiveGreeting] = React.useState('1');
  
  const handlePlay = (id: string) => {
    toast.info('Playing greeting...');
  };
  
  const handleDelete = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    toast.success('Greeting deleted successfully!');
  };
  
  const handleSetActive = (id: string) => {
    setActiveGreeting(id);
    toast.success('Active greeting updated');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16">
      <Header />
      
      <GreetingRecorder />
      
      <div className="px-4 mb-2">
        <h2 className="text-lg font-medium">Saved Greetings</h2>
        <p className="text-sm text-muted-foreground">
          Tap to set as active greeting
        </p>
      </div>
      
      <ScrollArea className="flex-1 px-4">
        {savedGreetings.map((greeting) => (
          <Card 
            key={greeting.id}
            className={`mb-3 p-3 ${activeGreeting === greeting.id ? 'border-primary border-2' : ''}`}
            onClick={() => handleSetActive(greeting.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{greeting.name}</h3>
                <p className="text-xs text-muted-foreground">
                  Duration: {greeting.duration}
                </p>
              </div>
              <div className="flex space-x-1">
                <Button size="icon" variant="ghost" onClick={() => handlePlay(greeting.id)}>
                  <Play className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost"
                  onClick={(e) => handleDelete(greeting.id, e)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
            {activeGreeting === greeting.id && (
              <div className="mt-2 text-xs font-medium text-primary">
                ✓ Currently Active
              </div>
            )}
          </Card>
        ))}
      </ScrollArea>
      
      <BottomNavigation />
    </div>
  );
};

export default Greetings;
