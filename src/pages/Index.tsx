
import { useState } from "react";
import CallToggle from "@/components/CallToggle";
import { Button } from "@/components/ui/button";

export default function Index() {
  const [greeting, setGreeting] = useState("مرحباً! هذا رد تلقائي من النظام.");

  return (
    <main className="py-10 min-h-screen flex flex-col justify-start items-center bg-background">
      <h1 className="text-2xl font-extrabold text-center mb-8" dir="rtl">
        تطبيق الرد الآلي على المكالمات
      </h1>
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="w-full max-w-md flex flex-col gap-2">
          <label className="font-medium block mb-1 text-right">
            الرسالة الترحيبية التي سيستمع إليها المتصل:
          </label>
          <textarea
            rows={3}
            className="w-full border rounded p-2 text-right"
            value={greeting}
            onChange={e => setGreeting(e.target.value)}
            placeholder="أدخل هنا نص الرسالة الترحيبية التي ستسمع للمتصل..."
          />
        </div>
        <CallToggle greeting={greeting} />
      </div>
    </main>
  );
}
