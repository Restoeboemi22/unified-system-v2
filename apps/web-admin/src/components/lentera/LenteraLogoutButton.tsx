"use client";

import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSessionStore } from "@/store/session-store";

export function LenteraLogoutButton() {
  const navigate = useNavigate();
  const clearAuth = useSessionStore((s) => s.clearAuth);

  return (
    <button
      type="button"
      onClick={() => {
        clearAuth();
        navigate("/admin/login?returnTo=/admin/lentera");
      }}
      className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-all duration-200 text-slate-300 hover:bg-white/10 hover:text-white"
    >
      <LogOut className="h-4 w-4" />
      <span>Logout</span>
    </button>
  );
}
