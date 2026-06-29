export type ServiceStatus = "active" | "limited" | "disabled";

export type SessionRecord = {
  sessionId: string;
  userId: string;
  identityId: string;
  activeMembershipId: string | null;
  expiresAt: string;
};
