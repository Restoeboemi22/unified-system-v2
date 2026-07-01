import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSessionStore } from "@/store/session-store";

export function useAuthGuard() {
  const navigate = useNavigate();
  const location = useLocation();
  const session = useSessionStore((state) => state.session);

  useEffect(() => {
    if (!session?.sessionId) {
      navigate("/login", { replace: true });
      return;
    }
    if (
      session.requiresPasswordChange &&
      session.activeRole === "admin" &&
      location.pathname !== "/edulock/admin"
    ) {
      navigate("/edulock/admin", { replace: true });
    }
  }, [location.pathname, navigate, session?.activeRole, session?.requiresPasswordChange, session?.sessionId]);

  return session;
}
