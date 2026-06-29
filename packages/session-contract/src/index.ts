import { z } from "zod";

export const IdentityProviderSchema = z.enum(["firebase"]);
export type IdentityProvider = z.infer<typeof IdentityProviderSchema>;

export const DeviceSchema = z.object({
  deviceId: z.string(),
  platform: z.enum(["android", "web", "ios"]).optional(),
  appVersion: z.string().optional(),
  buildVariant: z.string().optional()
});
export type DeviceDto = z.infer<typeof DeviceSchema>;

export const LoginSessionRequestSchema = z.object({
  provider: IdentityProviderSchema,
  idToken: z.string(),
  device: DeviceSchema.optional()
});
export type LoginSessionRequest = z.infer<typeof LoginSessionRequestSchema>;

export const RefreshSessionRequestSchema = z.object({
  sessionId: z.string()
});
export type RefreshSessionRequest = z.infer<typeof RefreshSessionRequestSchema>;

export const LogoutSessionRequestSchema = z.object({
  sessionId: z.string()
});
export type LogoutSessionRequest = z.infer<typeof LogoutSessionRequestSchema>;

export const SelectTenantRequestSchema = z.object({
  membershipId: z.string()
});
export type SelectTenantRequest = z.infer<typeof SelectTenantRequestSchema>;

export const MembershipSchema = z.object({
  membershipId: z.string(),
  schoolId: z.string(),
  role: z.string(),
  status: z.enum(["active", "inactive", "suspended"])
});
export type MembershipDto = z.infer<typeof MembershipSchema>;

export const SessionContextSchema = z.object({
  sessionId: z.string(),
  userId: z.string(),
  identityId: z.string(),
  activeSchoolId: z.string().nullable(),
  activeRole: z.string().nullable(),
  serviceStatus: z.enum(["active", "limited", "disabled"]),
  expiresAt: z.string()
});
export type SessionContextDto = z.infer<typeof SessionContextSchema>;

export const LoginSessionResponseSchema = z.object({
  session: SessionContextSchema,
  memberships: z.array(MembershipSchema),
  capabilities: z.array(z.string())
});
export type LoginSessionResponse = z.infer<typeof LoginSessionResponseSchema>;

export const RefreshSessionResponseSchema = z.object({
  session: SessionContextSchema,
  capabilities: z.array(z.string())
});
export type RefreshSessionResponse = z.infer<typeof RefreshSessionResponseSchema>;

export const LogoutSessionResponseSchema = z.object({
  success: z.boolean()
});
export type LogoutSessionResponse = z.infer<typeof LogoutSessionResponseSchema>;

export const GetSessionMeResponseSchema = z.object({
  session: SessionContextSchema,
  memberships: z.array(MembershipSchema),
  capabilities: z.array(z.string())
});
export type GetSessionMeResponse = z.infer<typeof GetSessionMeResponseSchema>;

export const SelectTenantResponseSchema = z.object({
  session: SessionContextSchema,
  capabilities: z.array(z.string())
});
export type SelectTenantResponse = z.infer<typeof SelectTenantResponseSchema>;
