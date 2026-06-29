import { z } from "zod";

export const IdentityProviderSchema = z.enum(["firebase"]);
export type IdentityProvider = z.infer<typeof IdentityProviderSchema>;

export const SchoolSchema = z.object({
  schoolId: z.string(),
  name: z.string(),
  status: z.enum(["active", "inactive"]).default("active"),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional()
});
export type SchoolDto = z.infer<typeof SchoolSchema>;

export const UpdateSchoolSettingsRequestSchema = z.object({
  name: z.string().min(1).optional(),
  status: z.enum(["active", "inactive"]).optional(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional()
});
export type UpdateSchoolSettingsRequest = z.infer<typeof UpdateSchoolSettingsRequestSchema>;

export const SchoolServiceStatusSchema = z.object({
  schoolId: z.string(),
  serviceStatus: z.enum(["active", "limited", "disabled"]),
  reasonCode: z.string().nullable().optional(),
  reasonText: z.string().nullable().optional(),
  updatedAt: z.string()
});
export type SchoolServiceStatusDto = z.infer<typeof SchoolServiceStatusSchema>;

export const GetSchoolResponseSchema = z.object({
  school: SchoolSchema
});
export type GetSchoolResponse = z.infer<typeof GetSchoolResponseSchema>;

export const GetSchoolsResponseSchema = z.object({
  schools: z.array(SchoolSchema)
});
export type GetSchoolsResponse = z.infer<typeof GetSchoolsResponseSchema>;

export const GetSchoolServiceStatusResponseSchema = z.object({
  serviceStatus: SchoolServiceStatusSchema
});
export type GetSchoolServiceStatusResponse = z.infer<
  typeof GetSchoolServiceStatusResponseSchema
>;

export const PatchSchoolServiceStatusRequestSchema = z.object({
  serviceStatus: z.enum(["active", "limited", "disabled"]),
  reasonCode: z.string().optional(),
  reasonText: z.string().optional()
});
export type PatchSchoolServiceStatusRequest = z.infer<
  typeof PatchSchoolServiceStatusRequestSchema
>;

export const MembershipSchema = z.object({
  membershipId: z.string(),
  userId: z.string().optional(),
  identityId: z.string().optional(),
  schoolId: z.string(),
  role: z.string(),
  status: z.enum(["active", "inactive", "suspended"])
});
export type MembershipDto = z.infer<typeof MembershipSchema>;

export const CreateMembershipRequestSchema = z.object({
  userId: z.string(),
  identityId: z.string(),
  schoolId: z.string(),
  role: z.string(),
  status: z.enum(["active", "inactive", "suspended"]).default("inactive")
});
export type CreateMembershipRequest = z.infer<typeof CreateMembershipRequestSchema>;

export const PatchMembershipRequestSchema = z.object({
  role: z.string().optional(),
  status: z.enum(["active", "inactive", "suspended"]).optional()
});
export type PatchMembershipRequest = z.infer<typeof PatchMembershipRequestSchema>;

export const GetMyMembershipsResponseSchema = z.object({
  memberships: z.array(MembershipSchema)
});
export type GetMyMembershipsResponse = z.infer<typeof GetMyMembershipsResponseSchema>;

export const GetUserMembershipsResponseSchema = z.object({
  memberships: z.array(MembershipSchema)
});
export type GetUserMembershipsResponse = z.infer<typeof GetUserMembershipsResponseSchema>;

export const GetMembershipResponseSchema = z.object({
  membership: MembershipSchema
});
export type GetMembershipResponse = z.infer<typeof GetMembershipResponseSchema>;

export const InternalSessionBootstrapRequestSchema = z.object({
  provider: IdentityProviderSchema,
  idToken: z.string()
});
export type InternalSessionBootstrapRequest = z.infer<
  typeof InternalSessionBootstrapRequestSchema
>;

export const InternalSessionContextRequestSchema = z.object({
  userId: z.string(),
  activeMembershipId: z.string().nullable().optional()
});
export type InternalSessionContextRequest = z.infer<
  typeof InternalSessionContextRequestSchema
>;

export const CanonicalSessionPrincipalSchema = z.object({
  userId: z.string(),
  identityId: z.string(),
  memberships: z.array(MembershipSchema),
  activeMembershipId: z.string(),
  activeSchoolId: z.string(),
  activeRole: z.string(),
  serviceStatus: z.enum(["active", "limited", "disabled"])
});
export type CanonicalSessionPrincipal = z.infer<typeof CanonicalSessionPrincipalSchema>;
