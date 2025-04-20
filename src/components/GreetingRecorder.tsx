
import React, { useRef, useState, useEffect } from "react";
import { Play, Save } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const DEFAULT_MESSAGE =
  "مرحبًا، شكرًا لاتصالك! سيتم الرد عليك في أقرب وقت ممكن.";

// نوع البيانات للرسالة الترحيبية
export interface GreetingDraft {
  id?: string; // مضاف للحالة اللاحقة (تعديل)
  text: string;
  createdAt?: Date;
}

interface GreetingRecorderProps {
  onSave: (greeting: GreetingDraft) => void;
  isSaving?: boolean;
  isEditing?: boolean;
  initialValue?: GreetingDraft | null;
  onCancelEdit?: () => void;
}

const GreetingRecorder: React.FC<GreetingRecorderProps> = ({
  onSave,
  isSaving,
  isEditing = false,
  initialValue = null,
  onCancelEdit,
}) => {
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [isPlaying, setIsPlaying] = useState(false);

  // عند بدء التعديل أو الخروج من التعديل، تعبئة النص أو إعادة الضبط
  useEffect(() => {
    if (isEditing && initialValue) {
      setMessage(initialValue.text);
    } else {
      setMessage(DEFAULT_MESSAGE);
    }
  }, [isEditing, initialValue]);

  // زر الاستماع للرسالة
  const handlePlay = () => {
    if ("speechSynthesis" in window && message) {
      setIsPlaying(true);
      const utter = new window.SpeechSynthesisUtterance(message);
      utter.lang = "ar-SA";
      utter.onend = () => setIsPlaying(false);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    } else {
      alert("المتصفح لا يدعم تحويل النص إلى صوت");
    }
  };

  // زر حفظ الرسالة (إضافة أو تعديل)
  const handleSave = () => {
    if (!message.trim()) return;
    onSave({
      id: initialValue?.id,
      text: message.trim(),
      createdAt: initialValue?.createdAt || new Date(),
    });
    setMessage(DEFAULT_MESSAGE); // إعادة الضبط بعد الحفظ
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
          <div className="flex mt-2 gap-2 flex-row-reverse">
            <Button
              className="rounded-lg px-5 font-normal flex gap-2"
              variant="outline"
              onClick={handlePlay}
              disabled={isPlaying || !message.trim()}
              type="button"
            >
              <Play className="w-4 h-4" />
              استمع للرسالة
            </Button>
            <Button
              className="rounded-lg px-5 font-normal flex gap-2"
              onClick={handleSave}
              disabled={isSaving || !message.trim()}
              variant="default"
              type="button"
            >
              <Save className="w-4 h-4" />
              {isEditing ? "تحديث الرسالة" : "حفظ الرسالة"}
            </Button>
            {isEditing && (
              <Button
                variant="destructive"
                className="rounded-lg px-5 font-normal"
                type="button"
                onClick={onCancelEdit}
              >
                إلغاء
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GreetingRecorder;
