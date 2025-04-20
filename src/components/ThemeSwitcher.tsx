
import React from "react";
import { Sun, Moon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface ThemeSwitcherProps {
  value: "light" | "dark" | "system";
  onChange: (theme: "light" | "dark" | "system") => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-4">
      <label className="text-sm font-medium flex items-center gap-2">
        <Settings className="w-4 h-4" />
        المظهر (السمة)
      </label>
      <Select value={value} onValueChange={(val) => onChange(val as any)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="اختر الوضع" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">
            <Sun className="w-4 h-4 inline mr-1" /> فاتح
          </SelectItem>
          <SelectItem value="dark">
            <Moon className="w-4 h-4 inline mr-1" /> داكن
          </SelectItem>
          <SelectItem value="system">اتبع إعداد النظام</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ThemeSwitcher;
