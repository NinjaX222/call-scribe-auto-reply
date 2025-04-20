import React, { useEffect, useRef, useState } from 'react';
import { 
  Clock, 
  MessageSquare, 
  Languages,
  Bell,
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
import { toast as toastShadcn } from '@/hooks/use-toast';
import ThemeSwitcher from './ThemeSwitcher';
import { useSettings } from "@/hooks/useSettings";
import { Dialog } from "@radix-ui/react-dialog";

const languageToastMap: Record<string, string> = {
  arabic: "تم تغيير اللغة إلى العربية",
  english: "Language switched to English",
};

const themeToastMap: Record<string, string> = {
  light: "تم تفعيل الوضع الفاتح",
  dark: "تم تفعيل الوضع الداكن",
  system: "تم التبديل إلى وضع النظام",
};

const Settings: React.FC = () => {
  const {
    settings,
    updateSetting,
    resetSettings,
    defaultSettings
  } = useSettings();

  // Confirm restore dialog state
  const [openResetDialog, setOpenResetDialog] = useState(false);

  // refs لحفظ القيم السابقة لتجنب عرض التوست أول مرة فقط عند التعديل
  const prevLang = useRef(settings.language);
  const prevTheme = useRef(settings.theme);

  // Toast عند تغيير اللغة
  useEffect(() => {
    if (prevLang.current !== settings.language) {
      toastShadcn({
        description: languageToastMap[settings.language] || "تم تغيير اللغة",
      });
      prevLang.current = settings.language;
    }
  }, [settings.language]);

  // Toast عند تغيير الثيم
  useEffect(() => {
    if (prevTheme.current !== settings.theme) {
      toastShadcn({
        description: themeToastMap[settings.theme] || "تم تغيير السمة",
      });
      prevTheme.current = settings.theme;
    }
  }, [settings.theme]);

  return (
    <div className="p-4 pb-20">
      <div className="space-y-4">
        <Card className="p-4 mb-1">
          <h3 className="flex items-center text-lg font-medium mb-4">
            <Languages className="h-5 w-5 mr-2" />
            اللغة و المظهر
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="language" className="mb-2 block">لغة البرنامج</Label>
              <Select
                value={settings.language}
                onValueChange={(val) => updateSetting("language", val as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر اللغة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arabic">العربية</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ThemeSwitcher
              value={settings.theme}
              onChange={val => updateSetting("theme", val)}
            />
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="flex items-center text-lg font-medium mb-4">
            <Clock className="h-5 w-5 mr-2" />
            إعدادات الرد التلقائي
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <Label>التأخير قبل الرد</Label>
                <span className="text-sm font-medium">{settings.responseDelay} ثانية</span>
              </div>
              <Slider
                value={[settings.responseDelay]}
                onValueChange={v => updateSetting("responseDelay", v[0])}
                min={5}
                max={60}
                step={1}
              />
              <p className="text-xs text-muted-foreground mt-1">
                الوقت قبل الرد التلقائي على الاتصال
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="flex items-center text-lg font-medium mb-4">
            <MessageSquare className="h-5 w-5 mr-2" />
            إعادة توجيه الرسائل بـ SMS
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-toggle">إرسال الرسائل عبر SMS</Label>
              <Switch
                id="sms-toggle"
                checked={settings.smsEnabled}
                onCheckedChange={checked =>
                  updateSetting("smsEnabled", checked as boolean)
                }
              />
            </div>
            {settings.smsEnabled && (
              <div>
                <Label htmlFor="phone-number" className="mb-2 block">رقم الهاتف</Label>
                <Input
                  id="phone-number"
                  placeholder="أدخل رقم الهاتف"
                  value={settings.phoneNumber}
                  onChange={e =>
                    updateSetting("phoneNumber", e.target.value)
                  }
                />
                <p className="text-xs text-muted-foreground mt-1">
                  سيتم إرسال الرسائل لهذا الرقم
                </p>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="flex items-center text-lg font-medium mb-4">
            <Bell className="h-5 w-5 mr-2" />
            الإشعارات
          </h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="notification-toggle">تفعيل الإشعارات</Label>
            <Switch
              id="notification-toggle"
              checked={settings.notificationsEnabled}
              onCheckedChange={checked =>
                updateSetting("notificationsEnabled", checked as boolean)
              }
            />
          </div>
        </Card>

        <Button
          variant="destructive"
          className="w-full mt-6"
          onClick={() => setOpenResetDialog(true)}
        >
          إعادة ضبط جميع الإعدادات الافتراضية
        </Button>

        {/* نافذة تأكيد إعادة الضبط */}
        {openResetDialog && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-xl p-6 shadow-lg max-w-xs flex flex-col gap-4 items-center">
              <div className="text-lg font-bold text-center mb-2">
                هل أنت متأكد من إعادة ضبط جميع الإعدادات؟
              </div>
              <div className="flex gap-2 mt-2 justify-center w-full">
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => {
                    resetSettings();
                    toastShadcn({
                      description: "تمت إعادة ضبط الإعدادات الافتراضية"
                    });
                    setOpenResetDialog(false);
                  }}
                >
                  نعم، إعادة الضبط
                </Button>
                <Button className="flex-1" onClick={() => setOpenResetDialog(false)}>
                  إلغاء
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
