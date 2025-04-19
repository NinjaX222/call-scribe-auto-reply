
// صفحة تسجيل دخول منفصلة
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "@/components/Auth";
import { useAuth } from "@/hooks/useAuth";

export default function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // إذا كان المستخدم مسجلاً يدخل مباشرة على الصفحة الرئيسية
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <Auth />
    </main>
  );
}
