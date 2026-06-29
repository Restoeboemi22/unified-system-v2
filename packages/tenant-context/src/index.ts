import { z } from "zod";

export const TenantContextSchema = z.object({
  sessionId: z.string(),
  userId: z.string().optional(),
  activeSchoolId: z.string().nullable(),
  activeRole: z.string().nullable(),
  capabilities: z.array(z.string()),
  serviceStatus: z.enum(["active", "disabled"]),
  requestId: z.string().optional()
});

export type TenantContext = z.infer<typeof TenantContextSchema>;
