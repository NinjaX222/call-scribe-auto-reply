
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Auth() {
  const { user, loading, signUp, signIn, signOut } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const err = isSignIn
      ? await signIn(email, password)
      : await signUp(email, password);
    if (err) setErrorMsg(err.message);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (user)
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <span className="font-semibold">مرحباً، {user.email}</span>
        <Button onClick={signOut} className="w-40">تسجيل الخروج</Button>
      </div>
    );

  return (
    <div className="max-w-xs mx-auto p-6 bg-card rounded-xl shadow mt-12">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} dir="rtl">
        <h2 className="text-lg font-bold text-center mb-2">
          {isSignIn ? "تسجيل الدخول" : "إنشاء حساب جديد"}
        </h2>
        <Input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          autoComplete="username"
          dir="ltr"
        />
        <Input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
          autoComplete={isSignIn ? "current-password" : "new-password"}
          dir="ltr"
        />
        <Button type="submit" className="w-full">
          {isSignIn ? "دخول" : "إنشاء حساب"}
        </Button>
        <button
          type="button"
          className="text-xs text-primary underline"
          onClick={() => setIsSignIn(s => !s)}
        >
          {isSignIn ? "ليس لديك حساب؟ أنشئ حسابًا جديدًا" : "لديك حساب؟ تسجيل دخول"}
        </button>
        {errorMsg && (
          <div className="text-destructive text-xs text-center mt-2">{errorMsg}</div>
        )}
      </form>
    </div>
  );
}
