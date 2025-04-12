
import React from 'react';
import { Phone, MessageSquare, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock call log data
const callLogs = [
  {
    id: '1',
    name: 'John Smith',
    number: '+1 (555) 123-4567',
    time: '10:30 AM',
    date: 'Today',
    duration: '0:45',
    hasMessage: true,
    message: 'Hey, I wanted to discuss the project deadline. Please call me back when you have a chance.',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    number: '+1 (555) 987-6543',
    time: 'Yesterday',
    date: 'Apr 11',
    duration: '1:20',
    hasMessage: true,
    message: 'Hi, just checking in about our meeting tomorrow. Please confirm if you're available.',
  },
  {
    id: '3',
    name: 'Alex Petrov',
    number: '+1 (555) 456-7890',
    time: 'Yesterday',
    date: 'Apr 11',
    duration: '0:30',
    hasMessage: false,
    message: '',
  },
  {
    id: '4',
    name: 'Maria Garcia',
    number: '+1 (555) 789-0123',
    time: '3:45 PM',
    date: 'Apr 10',
    duration: '1:05',
    hasMessage: true,
    message: 'Hello, I need to reschedule our appointment. Please call me back when convenient.',
  },
];

interface CallLogItemProps {
  log: typeof callLogs[0];
  onExpand: (id: string) => void;
  expanded: boolean;
}

const CallLogItem: React.FC<CallLogItemProps> = ({ log, onExpand, expanded }) => {
  return (
    <Card 
      className="mb-3 overflow-hidden cursor-pointer transition-all duration-200"
      onClick={() => onExpand(log.id)}
    >
      <div className="p-3">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">{log.name}</h3>
            <p className="text-sm text-muted-foreground">{log.number}</p>
          </div>
          <div className="text-right">
            <p className="text-sm">{log.time}</p>
            <p className="text-xs text-muted-foreground">{log.date}</p>
          </div>
        </div>
        
        {expanded && log.hasMessage && (
          <div className="mt-3 pt-3 border-t">
            <div className="flex items-start gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-primary mt-1" />
              <p className="text-sm">{log.message}</p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Duration: {log.duration}</span>
              <button className="text-primary hover:text-primary/80">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
        
        {expanded && !log.hasMessage && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-sm text-muted-foreground">No message recorded</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted-foreground">Duration: {log.duration}</span>
            </div>
          </div>
        )}
        
        {!expanded && log.hasMessage && (
          <div className="flex items-center mt-1 text-primary text-sm">
            <MessageSquare className="h-3 w-3 mr-1" />
            <span>Message available</span>
          </div>
        )}
      </div>
    </Card>
  );
};

const CallLog: React.FC = () => {
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const handleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Recent Calls</h2>
        <div className="bg-muted rounded-full px-3 py-1 text-xs font-medium">
          {callLogs.length} calls
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-250px)]">
        <div className="pr-4">
          {callLogs.map((log) => (
            <CallLogItem 
              key={log.id} 
              log={log} 
              onExpand={handleExpand} 
              expanded={expandedId === log.id}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CallLog;
