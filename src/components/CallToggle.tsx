
import React, { useState } from 'react';
import { Phone, PhoneOff, Clock } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface CallToggleProps {
  greeting: string;
}

// زر تفعيل الخدمة مع الرسالة الترحيبية المكتوبة
const CallToggle: React.FC<CallToggleProps> = ({ greeting }) => {
  const [active, setActive] = useState(false);
  const [responseDelay, setResponseDelay] = useState(20);

  const toggleActive = () => {
    setActive(!active);
    if (!active) {
      toast.success('تم تفعيل خدمة الرد التلقائي!');
      // يمكن ربط برمجياً هنا لبدء الرد التلقائي وقراءة greeting
    } else {
      toast.info('تم إيقاف خدمة الرد التلقائي');
    }
  };

  // للمحاكاة فقط: عند التفعيل، يظهر زر لسماع الرسالة
  const handleReadGreeting = () => {
    if ("speechSynthesis" in window) {
      const utter = new window.SpeechSynthesisUtterance(greeting);
      utter.lang = "ar";
      window.speechSynthesis.speak(utter);
    } else {
      toast.error('المتصفح لا يدعم قراءة النص تلقائياً');
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <Card className="w-[90%] p-4 mb-6 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium">خدمة الرد التلقائي</h2>
            <p className="text-sm text-muted-foreground">
              {active ? 'الخدمة فعّالة' : 'الخدمة غير مفعلة'}
            </p>
          </div>
          <Switch checked={active} onCheckedChange={toggleActive} />
        </div>
        
        <div className="flex items-center mt-4 gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            يرد بعد {responseDelay} ثانية
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
      
      <button
        disabled={!active}
        onClick={handleReadGreeting}
        className="mt-3 bg-primary text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        استمع إلى الرسالة الترحيبية
      </button>
      <p className="mt-3 text-sm font-medium">
        {active ? 'الرد الآلي مفعل' : 'الرد الآلي غير مفعل'}
      </p>
    </div>
  );
};

export default CallToggle;
