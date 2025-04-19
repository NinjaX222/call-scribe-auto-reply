
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "@/components/Auth";
import { useAuth } from "@/hooks/useAuth";

export default function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If user is logged in, redirect to home
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <Auth />
    </main>
  );
}
