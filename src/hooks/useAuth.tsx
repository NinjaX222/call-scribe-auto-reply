
// تم تعطيل خاصية المصادقة، لم يعد هناك تسجيل دخول أو خروج.
export function useAuth() {
  return {
    user: null,
    session: null,
    loading: false,
    signUp: async () => null,
    signIn: async () => null,
    signOut: async () => null,
  };
}
