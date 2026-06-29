import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Membership, SessionContext } from "@/types/api";

type SessionState = {
  session: SessionContext | null;
  memberships: Membership[];
  capabilities: string[];
  setAuth: (input: {
    session: SessionContext;
    memberships?: Membership[];
    capabilities?: string[];
  }) => void;
  clearAuth: () => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      memberships: [],
      capabilities: [],
      setAuth: ({ session, memberships, capabilities }) =>
        set((state) => ({
          session,
          memberships: memberships ?? state.memberships,
          capabilities: capabilities ?? state.capabilities
        })),
      clearAuth: () =>
        set({
          session: null,
          memberships: [],
          capabilities: []
        })
    }),
    {
      name: "web-admin-session",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
