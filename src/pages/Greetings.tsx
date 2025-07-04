
import React from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import GreetingRecorder, { GreetingDraft } from '@/components/GreetingRecorder';
import { Card } from '@/components/ui/card';
import { Play, Save, Edit, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// نوع الرسالة المحفوظة
type Greeting = {
  id: string;
  text: string;
  createdAt: number; // timestamp
  isActive?: boolean;
};

function getSavedGreetings(): Greeting[] {
  try {
    const s = localStorage.getItem('greetings');
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
}

function saveGreetings(data: Greeting[]) {
  localStorage.setItem('greetings', JSON.stringify(data));
}

const Greetings: React.FC = () => {
  const [greetings, setGreetings] = React.useState<Greeting[]>([]);
  const [activeGreeting, setActiveGreeting] = React.useState<string | null>(null);

  // لحالة التعديل
  const [editingGreeting, setEditingGreeting] = React.useState<Greeting | null>(null);

  // تحميل الرسائل من localStorage عند أول تحميل للصفحة فقط
  React.useEffect(() => {
    const stored = getSavedGreetings();
    setGreetings(stored);
    if (stored.length > 0) {
      setActiveGreeting(stored.find(g => g.isActive)?.id || stored[0].id);
    }
  }, []);

  // عند الحفظ: إضافة رسالة جديدة أو تعديل رسالة قائمة
  const handleSaveGreeting = (draft: GreetingDraft) => {
    let newGreetings: Greeting[];
    if (editingGreeting) {
      // تعديل
      newGreetings = greetings.map(g =>
        g.id === editingGreeting.id
          ? { ...g, text: draft.text }
          : g
      );
      toast.success('تم تحديث الرسالة');
    } else {
      // إضافة
      const newGreeting: Greeting = {
        id: Math.random().toString(36).substr(2, 9),
        text: draft.text,
        createdAt: draft.createdAt?.getTime() || Date.now(),
      };
      newGreetings = [newGreeting, ...greetings];
      setActiveGreeting(newGreeting.id);
      toast.success('تم حفظ الرسالة!');
    }
    saveGreetings(newGreetings);
    setGreetings(newGreetings);
    setEditingGreeting(null);
  };

  const handleSetActive = (id: string) => {
    setActiveGreeting(id);
    const newList = greetings.map(g => ({ ...g, isActive: g.id === id }));
    saveGreetings(newList);
    setGreetings(newList);
    toast.success('تم تحديث الرسالة النشطة');
  };

  const handlePlay = (greeting: Greeting) => {
    if ("speechSynthesis" in window) {
      const utter = new window.SpeechSynthesisUtterance(greeting.text);
      utter.lang = "ar-SA";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
      toast.info('جاري تشغيل الرسالة...');
    } else {
      toast.error("المتصفح لا يدعم تحويل النص إلى صوت");
    }
  };

  const handleDelete = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const rest = greetings.filter(g => g.id !== id);
    saveGreetings(rest);
    setGreetings(rest);
    if (activeGreeting === id && rest.length > 0) {
      setActiveGreeting(rest[0].id);
    } else if (rest.length === 0) {
      setActiveGreeting(null);
    }
    toast.success('تم حذف الرسالة');
    if (editingGreeting?.id === id) setEditingGreeting(null);
  };

  // عند الضغط على أيقونة القلم: تعديل
  const handleEdit = (greeting: Greeting) => {
    setEditingGreeting(greeting);
    window.scrollTo({ top: 0, behavior: "smooth" }); // صعود للأعلى لسهولة التعديل
  };

  // إلغاء التعديل
  const handleEditCancel = () => {
    setEditingGreeting(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16">
      <Header />

      <GreetingRecorder
        onSave={handleSaveGreeting}
        isEditing={!!editingGreeting}
        initialValue={
          editingGreeting
            ? { id: editingGreeting.id, text: editingGreeting.text, createdAt: new Date(editingGreeting.createdAt) }
            : null
        }
        onCancelEdit={handleEditCancel}
      />

      <div className="px-4 mb-2 flex flex-col items-end">
        <h2 className="text-lg font-medium" dir="rtl">الرسائل الترحيبية المحفوظة</h2>
        <p className="text-sm text-muted-foreground" dir="rtl">
          اضغط على الرسالة لجعلها الرسالة المعتمدة للرد التلقائي
        </p>
      </div>

      <ScrollArea className="flex-1 px-4">
        {greetings.length === 0 ? (
          <div className="text-center text-muted-foreground text-sm my-8">
            لا توجد أي رسائل ترحيبية محفوظة بعد.
          </div>
        ) : (
          greetings.map((greeting) => (
            <Card
              key={greeting.id}
              className={`mb-3 p-3 ${activeGreeting === greeting.id ? 'border-primary border-2' : ''} cursor-pointer`}
              onClick={() => handleSetActive(greeting.id)}
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 truncate">
                  <h3 className="font-medium text-right text-base" dir="rtl">
                    {greeting.text.split('\n')[0].slice(0, 30) + (greeting.text.length > 30 ? "...": "")}
                  </h3>
                  <p className="text-xs text-muted-foreground text-right mt-1 whitespace-pre-line" dir="rtl">
                    {greeting.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(greeting.createdAt).toLocaleString('ar-EG')}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handlePlay(greeting); }}>
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handleEdit(greeting); }}>
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
                <div className="mt-2 text-xs font-medium text-primary text-right" dir="rtl">
                  ✓ الرسالة النشطة حالياً
                </div>
              )}
            </Card>
          ))
        )}
      </ScrollArea>

      <BottomNavigation />
    </div>
  );
};

export default Greetings;
