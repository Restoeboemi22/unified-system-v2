import { z } from "zod";

export const StudentSchema = z.object({
  studentId: z.string(),
  schoolId: z.string(),
  studentNumber: z.string(),
  fullName: z.string(),
  status: z.enum(["active", "inactive"]),
  createdAt: z.string(),
  updatedAt: z.string()
});
export type StudentDto = z.infer<typeof StudentSchema>;

export const TeacherSchema = z.object({
  teacherId: z.string(),
  schoolId: z.string(),
  employeeNumber: z.string(),
  fullName: z.string(),
  subjectLabels: z.array(z.string()),
  status: z.enum(["active", "inactive"]),
  createdAt: z.string(),
  updatedAt: z.string()
});
export type TeacherDto = z.infer<typeof TeacherSchema>;

export const StaffSchema = z.object({
  staffId: z.string(),
  schoolId: z.string(),
  employeeNumber: z.string(),
  fullName: z.string(),
  positionTitle: z.string(),
  status: z.enum(["active", "inactive"]),
  createdAt: z.string(),
  updatedAt: z.string()
});
export type StaffDto = z.infer<typeof StaffSchema>;

export const PrincipalSchema = z.object({
  principalId: z.string(),
  schoolId: z.string(),
  appointmentCode: z.string().nullable(),
  fullName: z.string(),
  status: z.enum(["active", "inactive"]),
  createdAt: z.string(),
  updatedAt: z.string()
});
export type PrincipalDto = z.infer<typeof PrincipalSchema>;

export const ClassroomSchema = z.object({
  classroomId: z.string(),
  schoolId: z.string(),
  academicPeriodId: z.string(),
  gradeLevel: z.string(),
  classroomName: z.string(),
  homeroomTeacherId: z.string().nullable(),
  status: z.enum(["active", "inactive"]),
  createdAt: z.string(),
  updatedAt: z.string()
});
export type ClassroomDto = z.infer<typeof ClassroomSchema>;

export const AcademicPeriodSchema = z.object({
  academicPeriodId: z.string(),
  schoolId: z.string(),
  yearLabel: z.string(),
  semesterLabel: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  status: z.enum(["planned", "active", "closed"]),
  createdAt: z.string(),
  updatedAt: z.string()
});
export type AcademicPeriodDto = z.infer<typeof AcademicPeriodSchema>;

export const CreateStudentRequestSchema = z.object({
  schoolId: z.string(),
  studentNumber: z.string(),
  fullName: z.string()
});
export type CreateStudentRequest = z.infer<typeof CreateStudentRequestSchema>;

export const CreateTeacherRequestSchema = z.object({
  schoolId: z.string(),
  employeeNumber: z.string(),
  fullName: z.string(),
  subjectLabels: z.array(z.string()).default([])
});
export type CreateTeacherRequest = z.infer<typeof CreateTeacherRequestSchema>;

export const CreateStaffRequestSchema = z.object({
  schoolId: z.string(),
  employeeNumber: z.string(),
  fullName: z.string(),
  positionTitle: z.string()
});
export type CreateStaffRequest = z.infer<typeof CreateStaffRequestSchema>;

export const CreatePrincipalRequestSchema = z.object({
  schoolId: z.string(),
  appointmentCode: z.string().optional(),
  fullName: z.string()
});
export type CreatePrincipalRequest = z.infer<typeof CreatePrincipalRequestSchema>;

export const CreateClassroomRequestSchema = z.object({
  schoolId: z.string(),
  academicPeriodId: z.string(),
  gradeLevel: z.string(),
  classroomName: z.string(),
  homeroomTeacherId: z.string().optional()
});
export type CreateClassroomRequest = z.infer<typeof CreateClassroomRequestSchema>;

export const CreateAcademicPeriodRequestSchema = z.object({
  schoolId: z.string(),
  yearLabel: z.string(),
  semesterLabel: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  status: z.enum(["planned", "active", "closed"]).default("planned")
});
export type CreateAcademicPeriodRequest = z.infer<typeof CreateAcademicPeriodRequestSchema>;

export const ListStudentsResponseSchema = z.object({
  students: z.array(StudentSchema)
});
export type ListStudentsResponse = z.infer<typeof ListStudentsResponseSchema>;

export const ListTeachersResponseSchema = z.object({
  teachers: z.array(TeacherSchema)
});
export type ListTeachersResponse = z.infer<typeof ListTeachersResponseSchema>;

export const ListStaffsResponseSchema = z.object({
  staffs: z.array(StaffSchema)
});
export type ListStaffsResponse = z.infer<typeof ListStaffsResponseSchema>;

export const ListPrincipalsResponseSchema = z.object({
  principals: z.array(PrincipalSchema)
});
export type ListPrincipalsResponse = z.infer<typeof ListPrincipalsResponseSchema>;

export const ListClassroomsResponseSchema = z.object({
  classrooms: z.array(ClassroomSchema)
});
export type ListClassroomsResponse = z.infer<typeof ListClassroomsResponseSchema>;

export const ListAcademicPeriodsResponseSchema = z.object({
  academicPeriods: z.array(AcademicPeriodSchema)
});
export type ListAcademicPeriodsResponse = z.infer<typeof ListAcademicPeriodsResponseSchema>;

export const GetStudentResponseSchema = z.object({
  student: StudentSchema
});
export type GetStudentResponse = z.infer<typeof GetStudentResponseSchema>;

export const GetTeacherResponseSchema = z.object({
  teacher: TeacherSchema
});
export type GetTeacherResponse = z.infer<typeof GetTeacherResponseSchema>;

export const GetStaffResponseSchema = z.object({
  staff: StaffSchema
});
export type GetStaffResponse = z.infer<typeof GetStaffResponseSchema>;

export const GetPrincipalResponseSchema = z.object({
  principal: PrincipalSchema
});
export type GetPrincipalResponse = z.infer<typeof GetPrincipalResponseSchema>;

export const GetClassroomResponseSchema = z.object({
  classroom: ClassroomSchema
});
export type GetClassroomResponse = z.infer<typeof GetClassroomResponseSchema>;

export const GetAcademicPeriodResponseSchema = z.object({
  academicPeriod: AcademicPeriodSchema
});
export type GetAcademicPeriodResponse = z.infer<typeof GetAcademicPeriodResponseSchema>;

export const UpdateStudentRequestSchema = z.object({
  fullName: z.string().optional(),
  status: z.enum(["active", "inactive"]).optional()
});
export type UpdateStudentRequest = z.infer<typeof UpdateStudentRequestSchema>;

export const UpdateTeacherRequestSchema = z.object({
  fullName: z.string().optional(),
  subjectLabels: z.array(z.string()).optional(),
  status: z.enum(["active", "inactive"]).optional()
});
export type UpdateTeacherRequest = z.infer<typeof UpdateTeacherRequestSchema>;

export const UpdateStaffRequestSchema = z.object({
  fullName: z.string().optional(),
  positionTitle: z.string().optional(),
  status: z.enum(["active", "inactive"]).optional()
});
export type UpdateStaffRequest = z.infer<typeof UpdateStaffRequestSchema>;

export const UpdatePrincipalRequestSchema = z.object({
  appointmentCode: z.string().nullable().optional(),
  fullName: z.string().optional(),
  status: z.enum(["active", "inactive"]).optional()
});
export type UpdatePrincipalRequest = z.infer<typeof UpdatePrincipalRequestSchema>;

export const UpdateClassroomRequestSchema = z.object({
  academicPeriodId: z.string().optional(),
  gradeLevel: z.string().optional(),
  classroomName: z.string().optional(),
  homeroomTeacherId: z.string().nullable().optional(),
  status: z.enum(["active", "inactive"]).optional()
});
export type UpdateClassroomRequest = z.infer<typeof UpdateClassroomRequestSchema>;

export const UpdateAcademicPeriodRequestSchema = z.object({
  yearLabel: z.string().optional(),
  semesterLabel: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.enum(["planned", "active", "closed"]).optional()
});
export type UpdateAcademicPeriodRequest = z.infer<typeof UpdateAcademicPeriodRequestSchema>;
