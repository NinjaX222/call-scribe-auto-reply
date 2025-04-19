
import Auth from "@/components/Auth";
import { useAuth } from "@/hooks/useAuth";
import CallLogList from "@/components/CallLogList";

export default function Index() {
  const { user } = useAuth();

  return (
    <main className="py-10">
      <h1 className="text-2xl font-extrabold text-center mb-8" dir="rtl">
        تطبيق إدارة المكالمات الهاتفية
      </h1>
      {!user ? (
        <Auth />
      ) : (
        <div className="flex flex-col items-center">
          <CallLogList userId={user.id} />
        </div>
      )}
    </main>
  );
}
