import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStore } from "@/store/session-store";

export function useAuthGuard() {
  const navigate = useNavigate();
  const session = useSessionStore((state) => state.session);

  useEffect(() => {
    if (!session?.sessionId) {
      navigate("/login", { replace: true });
    }
  }, [navigate, session?.sessionId]);

  return session;
}
