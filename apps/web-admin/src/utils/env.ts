const fallbackUrls = {
  sessionServiceUrl: "http://localhost:4001",
  policyServiceUrl: "http://localhost:4002",
  tenantSchoolServiceUrl: "http://localhost:4003",
  academicDirectoryServiceUrl: "http://localhost:4004",
  attendanceServiceUrl: "http://localhost:4005"
};

export const env = {
  sessionServiceUrl:
    import.meta.env.VITE_SESSION_SERVICE_URL ?? fallbackUrls.sessionServiceUrl,
  policyServiceUrl:
    import.meta.env.VITE_POLICY_SERVICE_URL ?? fallbackUrls.policyServiceUrl,
  tenantSchoolServiceUrl:
    import.meta.env.VITE_TENANT_SCHOOL_SERVICE_URL ?? fallbackUrls.tenantSchoolServiceUrl,
  academicDirectoryServiceUrl:
    import.meta.env.VITE_ACADEMIC_DIRECTORY_SERVICE_URL ??
    fallbackUrls.academicDirectoryServiceUrl,
  attendanceServiceUrl:
    import.meta.env.VITE_ATTENDANCE_SERVICE_URL ?? fallbackUrls.attendanceServiceUrl
};
