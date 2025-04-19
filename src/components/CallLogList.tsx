
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Call = {
  id: string,
  caller_number: string,
  contact_name: string | null,
  received_at: string,
  answered: boolean,
  call_type: string | null,
  reason_text: string | null,
};

export default function CallLogList({ userId }: { userId: string }) {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCalls() {
      setLoading(true);
      const { data, error } = await supabase
        .from("calls")
        .select("*")
        .eq("created_by", userId)
        .order("received_at", { ascending: false });
      if (error) {
        setCalls([]);
      } else {
        setCalls(data || []);
      }
      setLoading(false);
    }
    fetchCalls();
  }, [userId]);

  if (loading) return <div className="text-center text-gray-500 py-6">جارٍ تحميل سجل المكالمات...</div>;
  if (!calls.length)
    return <div className="text-center text-gray-400 py-8">لا توجد مكالمات مسجلة بعد.</div>;

  return (
    <div className="w-full max-w-xl mx-auto mt-6">
      <h3 className="text-lg font-bold mb-4 pl-2" dir="rtl">سجل المكالمات</h3>
      <table className="w-full bg-card rounded-lg overflow-hidden text-right">
        <thead className="bg-muted text-xs">
          <tr>
            <th className="p-2">الاسم</th>
            <th className="p-2">الرقم</th>
            <th className="p-2">نوع المكالمة</th>
            <th className="p-2">الحالة</th>
            <th className="p-2">التاريخ</th>
            <th className="p-2">السبب</th>
          </tr>
        </thead>
        <tbody>
          {calls.map(call => (
            <tr key={call.id} className="border-t">
              <td className="p-2">{call.contact_name || "-"}</td>
              <td className="p-2 font-mono">{call.caller_number}</td>
              <td className="p-2">{call.call_type || "-"}</td>
              <td className="p-2">{call.answered ? "تم الرد" : "لم يتم الرد"}</td>
              <td className="p-2">{new Date(call.received_at).toLocaleString("ar-EG")}</td>
              <td className="p-2 truncate max-w-xs">{call.reason_text ? call.reason_text.substring(0, 30) : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
