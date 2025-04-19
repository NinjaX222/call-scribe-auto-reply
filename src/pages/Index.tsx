
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import CallToggle from "@/components/CallToggle";
import { Button } from "@/components/ui/button";

export default function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("مرحباً! هذا رد تلقائي من النظام.");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading)
    return <div className="text-center py-10">جاري التحميل...</div>;

  return (
    <main className="py-10">
      <h1 className="text-2xl font-extrabold text-center mb-8" dir="rtl">
        تطبيق الرد الآلي على المكالمات
      </h1>
      {user && (
        <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-md flex flex-col gap-2">
            <label className="font-medium block mb-1 text-right">الرسالة الترحيبية التي سيستمع إليها المتصل:</label>
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
      )}
    </main>
  );
}
