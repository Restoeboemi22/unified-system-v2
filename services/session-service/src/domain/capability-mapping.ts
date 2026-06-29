const ROLE_CAPABILITIES: Record<string, string[]> = {
  student: ["student.read", "attendance.submit", "prayer.submit"],
  teacher: ["teacher.read", "attendance.read", "attendance.submit"],
  staff: ["staff.read", "academic-directory.read"],
  admin: ["admin.read", "school.read", "school.manage", "service_status.manage", "student.manage", "staff.manage", "teacher.manage", "principal.manage", "classroom.manage", "academic_period.manage", "academic-directory.read"],
  principal: ["principal.read", "school.read", "reporting.read", "classroom.read", "academic_period.read"]
};

export function getCapabilitiesForRole(role: string | null): string[] {
  if (!role) return [];
  return ROLE_CAPABILITIES[role] ?? [];
}
