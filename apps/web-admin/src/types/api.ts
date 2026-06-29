export type Membership = {
  membershipId: string;
  schoolId: string;
  role: string;
  status: "active" | "inactive" | "suspended";
};

export type SessionContext = {
  sessionId: string;
  userId: string;
  identityId: string;
  activeSchoolId: string | null;
  activeRole: string | null;
  serviceStatus: "active" | "limited" | "disabled";
  expiresAt: string;
};

export type LoginResponse = {
  session: SessionContext;
  memberships: Membership[];
  capabilities: string[];
};

export type SessionMeResponse = LoginResponse;

export type SelectTenantResponse = {
  session: SessionContext;
  capabilities: string[];
};

export type PolicyCapabilitiesResponse = {
  capabilities: string[];
};

export type PolicyMeResponse = {
  activeSchoolId: string | null;
  activeRole: string | null;
  serviceStatus: "active" | "limited" | "disabled";
  capabilities: string[];
  deniedReasons: string[];
};

export type School = {
  schoolId: string;
  name: string;
  status: "active" | "inactive";
};

export type GetSchoolResponse = {
  school: School;
};

export type GetSchoolsResponse = {
  schools: School[];
};

export type ServiceStatus = {
  schoolId: string;
  serviceStatus: "active" | "limited" | "disabled";
  reasonCode?: string | null;
  reasonText?: string | null;
  updatedAt: string;
};

export type ServiceStatusResponse = {
  serviceStatus: ServiceStatus;
};

export type Student = {
  studentId: string;
  schoolId: string;
  studentNumber: string;
  fullName: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
};

export type StudentsResponse = {
  students: Student[];
};

export type StudentResponse = {
  student: Student;
};

export type ApiErrorPayload = {
  code?: string;
  message?: string;
  details?: unknown;
};

export type Teacher = {
  teacherId: string;
  schoolId: string;
  employeeNumber: string;
  fullName: string;
  subjectLabels: string[];
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
};

export type TeachersResponse = {
  teachers: Teacher[];
};

export type TeacherResponse = {
  teacher: Teacher;
};

export type Staff = {
  staffId: string;
  schoolId: string;
  employeeNumber: string;
  fullName: string;
  positionTitle: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
};

export type StaffsResponse = {
  staffs: Staff[];
};

export type StaffResponse = {
  staff: Staff;
};

export type Classroom = {
  classroomId: string;
  schoolId: string;
  academicPeriodId: string;
  gradeLevel: string;
  classroomName: string;
  homeroomTeacherId: string | null;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
};

export type ClassroomsResponse = {
  classrooms: Classroom[];
};

export type ClassroomResponse = {
  classroom: Classroom;
};

export type AcademicPeriod = {
  academicPeriodId: string;
  schoolId: string;
  yearLabel: string;
  semesterLabel: string;
  startDate: string;
  endDate: string;
  status: "planned" | "active" | "closed";
  createdAt: string;
  updatedAt: string;
};

export type AcademicPeriodsResponse = {
  academicPeriods: AcademicPeriod[];
};

export type AcademicPeriodResponse = {
  academicPeriod: AcademicPeriod;
};

export type AttendanceRecord = {
  attendanceId: string;
  studentId: string;
  schoolId: string;
  date: string;
  status: "PRESENT" | "LATE" | "ALPHA" | "SICK" | "PERMIT";
  latitude?: number | null;
  longitude?: number | null;
  distanceMeters?: number | null;
  submittedAt?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DailyAttendanceResponse = {
  date: string;
  records: AttendanceRecord[];
};
