import React, { useState, useRef } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const DEFAULT_GREETING =
  "مرحبًا، شكرًا لاتصالك! سيتم الرد عليك في أقرب وقت ممكن.";

const GreetingRecorder: React.FC = () => {
  const [greetingText, setGreetingText] = useState(DEFAULT_GREETING);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [loadingAudio, setLoadingAudio] = useState(false);

  // هذه الدالة تحوّل النص إلى صوت باستخدام متصفح الويب (كنسخة أولية، يمكن استخدام ElevenLabs لاحقًا)
  const synthesizeSpeech = async () => {
    if (!greetingText.trim()) return;
    setLoadingAudio(true);
    try {
      // استخدام SpeechSynthesis API (أبسط حل سريع مؤقتاً)
      const utterance = new window.SpeechSynthesisUtterance(greetingText);
      utterance.lang = "ar-SA";
      window.speechSynthesis.speak(utterance);
      toast.info("جاري قراءة الرسالة الترحيبية...");

      // (لدمج ElevenLabs لاحقا: يمكنك استلام API Key وسأعدل الاستخدام)
    } catch (err) {
      toast.error("تعذر تشغيل الرسالة الصوتية!");
    } finally {
      setLoadingAudio(false);
    }
  };

  return (
    <div className="p-4">
      <Card className="p-4 mb-4" dir="rtl">
        <h3 className="font-medium mb-2">اكتب رسالة ترحيبية للمتصل</h3>
        <p className="text-sm text-muted-foreground mb-4">
          أدخل الرسالة التي ستُقرأ للمتصل عند الرد التلقائي
        </p>
        <Textarea
          value={greetingText}
          onChange={(e) => setGreetingText(e.target.value)}
          rows={3}
          dir="rtl"
        />
        <div className="flex justify-end mt-2 gap-2">
          <Button
            variant="outline"
            onClick={synthesizeSpeech}
            disabled={loadingAudio || !greetingText.trim()}
          >
            <Play className="h-4 w-4 mr-2" />
            استمع للرسالة
          </Button>
        </div>
      </Card>
      {/* بإمكانك إضافة audioRef هنا إذا استخدمت تحويل نص لصوت حقيقي (mp3) عبر API لاحقًا */}
    </div>
  );
};

export default GreetingRecorder;
