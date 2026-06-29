import { z } from "zod";

export const AttendanceStatusSchema = z.enum([
  "PRESENT",
  "LATE",
  "ALPHA",
  "SICK",
  "PERMIT"
]);
export type AttendanceStatus = z.infer<typeof AttendanceStatusSchema>;

export const AttendanceRecordSchema = z.object({
  attendanceId: z.string(),
  studentId: z.string(),
  schoolId: z.string(),
  date: z.string(), // ISO string YYYY-MM-DD
  status: AttendanceStatusSchema,
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  distanceMeters: z.number().nullable().optional(),
  submittedAt: z.string().nullable().optional(), // ISO datetime
  notes: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string()
});
export type AttendanceRecordDto = z.infer<typeof AttendanceRecordSchema>;

export const SubmitAttendanceRequestSchema = z.object({
  latitude: z.number(),
  longitude: z.number()
});
export type SubmitAttendanceRequest = z.infer<typeof SubmitAttendanceRequestSchema>;

export const SubmitAttendanceResponseSchema = z.object({
  record: AttendanceRecordSchema
});
export type SubmitAttendanceResponse = z.infer<typeof SubmitAttendanceResponseSchema>;

export const GetDailyAttendanceResponseSchema = z.object({
  date: z.string(),
  records: z.array(AttendanceRecordSchema)
});
export type GetDailyAttendanceResponse = z.infer<typeof GetDailyAttendanceResponseSchema>;

// For teachers to manually override/input attendance
export const OverrideAttendanceRequestSchema = z.object({
  studentId: z.string(),
  status: AttendanceStatusSchema,
  notes: z.string().optional()
});
export type OverrideAttendanceRequest = z.infer<typeof OverrideAttendanceRequestSchema>;
