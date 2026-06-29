import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { api } from "@/lib/api";
import { useSessionStore } from "@/store/session-store";
import type { Membership } from "@/types/api";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  
  const [pendingMemberships, setPendingMemberships] = useState<Membership[]>([]);
  const setAuth = useSessionStore((state) => state.setAuth);

  const loginMutation = useMutation({
    mutationFn: (input: { provider: "firebase"; idToken: string }) => api.login(input),
    onSuccess: (data) => {
      setAuth(data);
      setPendingMemberships(data.memberships);
      if (data.session.activeSchoolId || data.memberships.length === 0 || data.memberships.length === 1) {
        navigate("/dashboard", { replace: true });
      }
    }
  });

  const tenantMutation = useMutation({
    mutationFn: async (membershipId: string) => {
      const sessionId = useSessionStore.getState().session?.sessionId;
      if (!sessionId) throw new Error("Session belum tersedia");
      return api.selectTenant(sessionId, membershipId);
    },
    onSuccess: (data) => {
      setAuth(data);
      navigate("/dashboard", { replace: true });
    }
  });

  const apiError = loginMutation.error
    ? loginMutation.error instanceof Error
      ? loginMutation.error.message
      : "Gagal terhubung ke server (HTTP 502/503)"
    : null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFirebaseError(null);
    setIsLoggingIn(true);

    try {
      if (import.meta.env.DEV) {
        if (password === "superadmin123" || password === "admin123") {
          loginMutation.mutate({ provider: "firebase", idToken: "SUPER_ADMIN_TOKEN" });
          return;
        }
        if (password === "admin") {
          loginMutation.mutate({ provider: "firebase", idToken: "ADMIN_TOKEN" });
          return;
        }
        if (password === "student") {
          loginMutation.mutate({ provider: "firebase", idToken: "TOKEN_DARI_PROVIDER" });
          return;
        }
      }

      // OPSI B: Autentikasi sungguhan menggunakan Firebase Email/Password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      loginMutation.mutate({ provider: "firebase", idToken });
    } catch (error: any) {
      console.error("Firebase Login Error", error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setFirebaseError("Email atau Password salah.");
      } else {
        setFirebaseError(error.message || "Gagal melakukan autentikasi ke Firebase.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (pendingMemberships.length > 1) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B1120] px-4 font-sans text-slate-200">
        <div className="w-full max-w-md rounded-2xl bg-[#1E293B] p-8 shadow-2xl">
          <h2 className="mb-6 text-center text-xl font-bold text-white">Pilih Peran Sekolah</h2>
          <div className="space-y-3">
            {pendingMemberships.map((membership) => (
              <button
                key={membership.membershipId}
                onClick={() => tenantMutation.mutate(membership.membershipId)}
                disabled={tenantMutation.isPending}
                className="flex w-full flex-col rounded-xl border border-slate-700 bg-slate-800 p-4 text-left hover:bg-slate-700 disabled:opacity-50"
              >
                <span className="font-semibold text-white">{membership.schoolId}</span>
                <span className="text-sm text-slate-400 capitalize">{membership.role.replace("_", " ")}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0B1120] px-4 font-sans">
      <div className="w-full max-w-md overflow-hidden rounded-[24px] bg-[#111827] border border-slate-800 shadow-2xl">
        <div className="p-8 sm:p-12">
          
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl">
            <img src="/PortalKita.png" alt="PortalKita Logo" className="h-full w-full object-contain" />
          </div>

          <div className="mb-10 text-center">
            <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-1">
              Selamat Datang di Portalkita
            </h3>
            <h1 className="text-2xl font-bold text-white">
              Login Admin
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">NPSN / Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Contoh: admin@sekolah.sch.id"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-blue-500 focus:bg-slate-900"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-blue-500 focus:bg-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {apiError ? <p className="text-sm text-rose-500 text-center">{apiError}</p> : null}
            {firebaseError ? <p className="text-sm text-orange-500 text-center">{firebaseError}</p> : null}

            <button
              type="submit"
              disabled={isLoggingIn || loginMutation.isPending}
              className="mt-2 w-full rounded-xl bg-indigo-500 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-600 disabled:opacity-50"
            >
              {isLoggingIn || loginMutation.isPending ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Lupa Password?
            </a>
          </div>

        </div>
      </div>
      
      <div className="mt-8 text-center text-xs text-slate-500 max-w-xs">
        <p>Admin sekolah: NPSN + admin123 (wajib ganti password saat masuk pertama).</p>
      </div>
    </div>
  );
}
