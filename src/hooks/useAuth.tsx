
// تحديث useAuth ليتبع أفضل ممارسات Supabase (تخزين session وuser معًا)
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // أولاً: إعداد مستمع تغيير الحالة
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // بعدها: جلب الجلسة الحالية إن وجدت
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    return error;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    return error;
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  }, []);

  return { user, session, loading, signUp, signIn, signOut };
}
