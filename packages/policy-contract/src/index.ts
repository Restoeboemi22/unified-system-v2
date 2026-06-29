import { z } from "zod";

export const PolicyMeResponseSchema = z.object({
  activeSchoolId: z.string().nullable(),
  activeRole: z.string().nullable(),
  serviceStatus: z.enum(["active", "limited", "disabled"]),
  capabilities: z.array(z.string()),
  deniedReasons: z.array(z.string())
});
export type PolicyMeResponse = z.infer<typeof PolicyMeResponseSchema>;

export const PolicyEvaluateRequestSchema = z.object({
  action: z.string(),
  resource: z.record(z.unknown()).optional()
});
export type PolicyEvaluateRequest = z.infer<typeof PolicyEvaluateRequestSchema>;

export const PolicyEvaluateResponseSchema = z.object({
  allowed: z.boolean(),
  action: z.string(),
  reasons: z.array(z.string())
});
export type PolicyEvaluateResponse = z.infer<typeof PolicyEvaluateResponseSchema>;

export const PolicyCapabilitiesResponseSchema = z.object({
  capabilities: z.array(z.string())
});
export type PolicyCapabilitiesResponse = z.infer<typeof PolicyCapabilitiesResponseSchema>;
