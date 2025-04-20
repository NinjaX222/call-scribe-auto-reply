import React, { useRef, useState } from "react";
import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const DEFAULT_MESSAGE =
  "مرحبًا، شكرًا لاتصالك! سيتم الرد عليك في أقرب وقت ممكن.";

const GreetingRecorder: React.FC = () => {
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Placeholder: Play local text-to-speech using browser API
  const handlePlay = () => {
    if ("speechSynthesis" in window && message) {
      setIsPlaying(true);
      // فضلًا، لاحظ أن هذا للاستخدام التجريبي فقط
      const utter = new window.SpeechSynthesisUtterance(message);
      utter.lang = "ar-SA";
      utter.onend = () => setIsPlaying(false);
      window.speechSynthesis.cancel(); // Cancel if already playing
      window.speechSynthesis.speak(utter);
    } else {
      alert("المتصفح لا يدعم تحويل النص إلى صوت");
    }
  };

  return (
    <div className="p-4">
      <Card className="p-4 mb-4">
        <div className="flex flex-col gap-2">
          <label className="font-medium" dir="rtl">
            اكتب رسالة ترحيبية للمتصل
          </label>
          <span className="text-sm text-muted-foreground text-right block" dir="rtl">
            أدخل الرسالة التي سيقرأها المتصل عند الرد التلقائي
          </span>

          <Textarea
            className="bg-muted min-h-[80px] text-right"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            dir="rtl"
            placeholder="اكتب رسالتك هنا..."
          />
          <div className="flex mt-2">
            <Button
              className="rounded-lg px-5 font-normal flex gap-2"
              variant="outline"
              onClick={handlePlay}
              disabled={isPlaying || !message.trim()}
            >
              <Play className="w-4 h-4" />
              استمع للرسالة
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GreetingRecorder;
