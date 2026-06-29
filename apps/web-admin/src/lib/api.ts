import { env } from "@/utils/env";
import type {
  ApiErrorPayload,
  GetSchoolResponse,
  GetSchoolsResponse,
  LoginResponse,
  PolicyCapabilitiesResponse,
  PolicyMeResponse,
  SelectTenantResponse,
  ServiceStatusResponse,
  SessionMeResponse,
  StudentResponse,
  StudentsResponse,
  TeacherResponse,
  TeachersResponse,
  StaffResponse,
  StaffsResponse,
  ClassroomResponse,
  ClassroomsResponse,
  AcademicPeriodResponse,
  AcademicPeriodsResponse,
  DailyAttendanceResponse
} from "@/types/api";

type JsonBody = Record<string, unknown> | undefined;

export class ApiError extends Error {
  status: number;
  payload?: ApiErrorPayload;

  constructor(status: number, message: string, payload?: ApiErrorPayload) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

async function request<T>(
  url: string,
  init?: RequestInit & { json?: JsonBody; sessionId?: string }
): Promise<T> {
  const headers = new Headers(init?.headers);
  headers.set("content-type", "application/json");
  if (init?.sessionId) {
    headers.set("authorization", `Bearer ${init.sessionId}`);
  }

  const response = await fetch(url, {
    ...init,
    headers,
    body: init?.json ? JSON.stringify(init.json) : init?.body
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => undefined)) as ApiErrorPayload | undefined;
    throw new ApiError(
      response.status,
      payload?.message ?? `HTTP ${response.status}`,
      payload
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const api = {
  login(input: { provider: "firebase"; idToken: string }) {
    return request<LoginResponse>(`${env.sessionServiceUrl}/v1/sessions/login`, {
      method: "POST",
      json: input
    });
  },
  getSessionMe(sessionId: string) {
    return request<SessionMeResponse>(`${env.sessionServiceUrl}/v1/sessions/me`, {
      sessionId
    });
  },
  selectTenant(sessionId: string, membershipId: string) {
    return request<SelectTenantResponse>(`${env.sessionServiceUrl}/v1/sessions/select-tenant`, {
      method: "POST",
      sessionId,
      json: { membershipId }
    });
  },
  logout(sessionId: string) {
    return request<{ success: boolean }>(`${env.sessionServiceUrl}/v1/sessions/logout`, {
      method: "POST",
      json: { sessionId }
    });
  },
  getPolicyMe(sessionId: string) {
    return request<PolicyMeResponse>(`${env.policyServiceUrl}/v1/policies/me`, {
      sessionId
    });
  },
  getCapabilities(sessionId: string) {
    return request<PolicyCapabilitiesResponse>(`${env.policyServiceUrl}/v1/policies/capabilities`, {
      sessionId
    });
  },
  getSchools(sessionId: string) {
    return request<GetSchoolsResponse>(`${env.tenantSchoolServiceUrl}/v1/schools`, {
      sessionId
    });
  },
  getSchool(sessionId: string, schoolId: string) {
    return request<GetSchoolResponse>(`${env.tenantSchoolServiceUrl}/v1/schools/${schoolId}`, {
      sessionId
    });
  },
  getServiceStatus(sessionId: string, schoolId: string) {
    return request<ServiceStatusResponse>(
      `${env.tenantSchoolServiceUrl}/v1/schools/${schoolId}/service-status`,
      { sessionId }
    );
  },
  patchServiceStatus(
    sessionId: string,
    schoolId: string,
    input: {
      serviceStatus: "active" | "limited" | "disabled";
      reasonCode?: string;
      reasonText?: string;
    }
  ) {
    return request<ServiceStatusResponse>(
      `${env.tenantSchoolServiceUrl}/v1/schools/${schoolId}/service-status`,
      {
        method: "PATCH",
        sessionId,
        json: input
      }
    );
  },
  updateSchoolSettings(
    sessionId: string,
    schoolId: string,
    input: any
  ) {
    return request<GetSchoolResponse>(
      `${env.tenantSchoolServiceUrl}/v1/schools/${schoolId}/settings`,
      {
        method: "PATCH",
        sessionId,
        json: input
      }
    );
  },
  
  // -- GAS Mock Endpoints --
  getGasSyncJobs(sessionId: string) {
    return request<any>(`${env.tenantSchoolServiceUrl}/v1/gas/sync-jobs`, { sessionId });
  },
  createGasSyncJob(sessionId: string, input: any) {
    return request<any>(`${env.tenantSchoolServiceUrl}/v1/gas/sync-jobs`, { method: "POST", sessionId, json: input });
  },
  updateGasSyncJobStatus(sessionId: string, id: string, status: string) {
    return request<any>(`${env.tenantSchoolServiceUrl}/v1/gas/sync-jobs/${id}/status`, { method: "PATCH", sessionId, json: { status } });
  },
  getGasBroadcasts(sessionId: string) {
    return request<any>(`${env.tenantSchoolServiceUrl}/v1/gas/broadcasts`, { sessionId });
  },
  createGasBroadcast(sessionId: string, input: any) {
    return request<any>(`${env.tenantSchoolServiceUrl}/v1/gas/broadcasts`, { method: "POST", sessionId, json: input });
  },
  getGasSupportTickets(sessionId: string) {
    return request<any>(`${env.tenantSchoolServiceUrl}/v1/gas/support-tickets`, { sessionId });
  },
  updateGasSupportTicketStatus(sessionId: string, id: string, status: string) {
    return request<any>(`${env.tenantSchoolServiceUrl}/v1/gas/support-tickets/${id}/status`, { method: "PATCH", sessionId, json: { status } });
  },
  getGasAuditLogs(sessionId: string) {
    return request<any>(`${env.tenantSchoolServiceUrl}/v1/gas/audit-logs`, { sessionId });
  },

  // -- EduLock Mock Endpoints --
  getEdulockDevices(sessionId: string) {
    return request<any>(`${env.tenantSchoolServiceUrl}/v1/edulock/devices`, { sessionId });
  },
  getEdulockSessions(sessionId: string) {
    return request<any>(`${env.tenantSchoolServiceUrl}/v1/edulock/sessions`, { sessionId });
  },
  getEdulockViolations(sessionId: string) {
    return request<any>(`${env.tenantSchoolServiceUrl}/v1/edulock/violations`, { sessionId });
  },
  lockEdulockDevice(sessionId: string, id: string) {
    return request<any>(`${env.tenantSchoolServiceUrl}/v1/edulock/devices/${id}/lock`, { method: "PATCH", sessionId });
  },
  unlockEdulockDevice(sessionId: string, id: string) {
    return request<any>(`${env.tenantSchoolServiceUrl}/v1/edulock/devices/${id}/unlock`, { method: "PATCH", sessionId });
  },

  // -- Lentera Mock Endpoints --
  getLenteraMembers(sessionId: string) {
    return request<any>(`${env.tenantSchoolServiceUrl}/v1/lentera/members`, { sessionId });
  },
  updateLenteraMemberStatus(sessionId: string, id: string, status: string) {
    return request<any>(`${env.tenantSchoolServiceUrl}/v1/lentera/members/${id}/status`, { method: "PATCH", sessionId, json: { status } });
  },

  getStudents(sessionId: string, schoolId?: string) {
    const search = schoolId ? `?schoolId=${encodeURIComponent(schoolId)}` : "";
    return request<StudentsResponse>(
      `${env.academicDirectoryServiceUrl}/v1/students${search}`,
      { sessionId }
    );
  },
  createStudent(
    sessionId: string,
    input: {
      schoolId: string;
      studentNumber: string;
      fullName: string;
    }
  ) {
    return request<StudentResponse>(`${env.academicDirectoryServiceUrl}/v1/students`, {
      method: "POST",
      sessionId,
      json: input
    });
  },
  getTeachers(sessionId: string, schoolId?: string) {
    const search = schoolId ? `?schoolId=${encodeURIComponent(schoolId)}` : "";
    return request<TeachersResponse>(
      `${env.academicDirectoryServiceUrl}/v1/teachers${search}`,
      { sessionId }
    );
  },
  createTeacher(
    sessionId: string,
    input: {
      schoolId: string;
      employeeNumber: string;
      fullName: string;
      subjectLabels?: string[];
    }
  ) {
    return request<TeacherResponse>(`${env.academicDirectoryServiceUrl}/v1/teachers`, {
      method: "POST",
      sessionId,
      json: input
    });
  },
  getStaffs(sessionId: string, schoolId?: string) {
    const search = schoolId ? `?schoolId=${encodeURIComponent(schoolId)}` : "";
    return request<StaffsResponse>(
      `${env.academicDirectoryServiceUrl}/v1/staffs${search}`,
      { sessionId }
    );
  },
  createStaff(
    sessionId: string,
    input: {
      schoolId: string;
      employeeNumber: string;
      fullName: string;
      positionTitle: string;
    }
  ) {
    return request<StaffResponse>(`${env.academicDirectoryServiceUrl}/v1/staffs`, {
      method: "POST",
      sessionId,
      json: input
    });
  },
  getClassrooms(sessionId: string, schoolId?: string) {
    const search = schoolId ? `?schoolId=${encodeURIComponent(schoolId)}` : "";
    return request<ClassroomsResponse>(
      `${env.academicDirectoryServiceUrl}/v1/classrooms${search}`,
      { sessionId }
    );
  },
  createClassroom(
    sessionId: string,
    input: {
      schoolId: string;
      academicPeriodId: string;
      gradeLevel: string;
      classroomName: string;
      homeroomTeacherId?: string;
    }
  ) {
    return request<ClassroomResponse>(`${env.academicDirectoryServiceUrl}/v1/classrooms`, {
      method: "POST",
      sessionId,
      json: input
    });
  },
  getClassroom(sessionId: string, schoolId: string, classroomId: string) {
    return request<ClassroomResponse>(`${env.academicDirectoryServiceUrl}/v1/schools/${schoolId}/classrooms/${classroomId}`, {
      sessionId
    });
  },
  getAcademicPeriods(sessionId: string, schoolId: string) {
    const search = schoolId ? `?schoolId=${encodeURIComponent(schoolId)}` : "";
    return request<AcademicPeriodsResponse>(
      `${env.academicDirectoryServiceUrl}/v1/academic-periods${search}`,
      { sessionId }
    );
  },
  createAcademicPeriod(
    sessionId: string,
    input: {
      schoolId: string;
      yearLabel: string;
      semesterLabel: string;
      startDate: string;
      endDate: string;
      status?: "planned" | "active" | "closed";
    }
  ) {
    return request<AcademicPeriodResponse>(`${env.academicDirectoryServiceUrl}/v1/academic-periods`, {
      method: "POST",
      sessionId,
      json: input
    });
  },
  getDailyAttendance(sessionId: string, date: string) {
    return request<DailyAttendanceResponse>(`${env.attendanceServiceUrl}/v1/attendance/daily?date=${date}`, {
      sessionId
    });
  }
};
