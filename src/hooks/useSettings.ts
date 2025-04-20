
import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";
export type Language = "arabic" | "english";

export interface SettingsState {
  theme: Theme;
  language: Language;
  responseDelay: number;
  smsEnabled: boolean;
  notificationsEnabled: boolean;
  phoneNumber: string;
}

const STORAGE_KEY = "app_settings_v1";

const defaultSettings: SettingsState = {
  theme: "system",
  language: "arabic",
  responseDelay: 20,
  smsEnabled: true,
  notificationsEnabled: true,
  phoneNumber: "+1234567890",
};

function getInitialSettings(): SettingsState {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) return { ...defaultSettings, ...JSON.parse(s) };
  } catch (e) {}
  return { ...defaultSettings };
}

export function useSettings() {
  const [settings, setSettings] = useState<SettingsState>(getInitialSettings());

  // Sync localStorage on every changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Theme sync (html class)
  useEffect(() => {
    const root = document.documentElement;
    function updateTheme() {
      if (settings.theme === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.toggle("dark", prefersDark);
      } else {
        root.classList.toggle("dark", settings.theme === "dark");
      }
    }
    updateTheme();
    if (settings.theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", updateTheme);
      return () => mq.removeEventListener("change", updateTheme);
    }
  }, [settings.theme]);

  // Lang sync (body dir/language)
  useEffect(() => {
    if (settings.language === "arabic") {
      document.body.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.body.dir = "ltr";
      document.documentElement.lang = "en";
    }
  }, [settings.language]);

  // تحديث/تغيير أي إعداد
  const updateSetting = useCallback(
    <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
      setSettings((s) => ({ ...s, [key]: value }));
    },
    []
  );

  // إعادة ضبط للإعدادات الافتراضية
  const resetSettings = useCallback(() => {
    setSettings({ ...defaultSettings });
  }, []);

  return {
    settings,
    setSettings,
    updateSetting,
    resetSettings,
    defaultSettings,
  };
}

