
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import CallLogList from "@/components/CallLogList";

export default function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

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
        تطبيق إدارة المكالمات الهاتفية
      </h1>
      {user && (
        <div className="flex flex-col items-center">
          <CallLogList userId={user.id} />
        </div>
      )}
    </main>
  );
}
