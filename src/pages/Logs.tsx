
import React from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import CallLog from '@/components/CallLog';
import { Button } from '@/components/ui/button';
import { Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const Logs: React.FC = () => {
  const handleExport = () => {
    toast.success('Call logs exported successfully');
  };
  
  const handleClearLogs = () => {
    toast.info('Call logs cleared');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background pb-16">
      <Header />
      
      <CallLog />
      
      <div className="fixed bottom-20 left-4 right-4 flex justify-between gap-4">
        <Button className="flex-1" variant="outline" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
        <Button className="flex-1" variant="destructive" onClick={handleClearLogs}>
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Logs
        </Button>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Logs;
