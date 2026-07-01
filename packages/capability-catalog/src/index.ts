export const CAPABILITIES = {
  schoolRead: "school.read",
  schoolManage: "school.manage",
  studentRead: "student.read",
  studentManage: "student.manage",
  staffRead: "staff.read",
  staffManage: "staff.manage",
  classroomRead: "classroom.read",
  classroomManage: "classroom.manage",
  academicPeriodRead: "academic_period.read",
  academicPeriodManage: "academic_period.manage",
  teacherManage: "teacher.manage",
  principalManage: "principal.manage",
  attendanceRead: "attendance.read",
  attendanceSubmit: "attendance.submit",
  prayerSubmit: "prayer.submit",
  teacherRead: "teacher.read",
  adminRead: "admin.read",
  principalRead: "principal.read",
  reportingRead: "reporting.read",
  academicDirectoryRead: "academic-directory.read",
  serviceStatusManage: "service_status.manage"
} as const;

export type Capability = (typeof CAPABILITIES)[keyof typeof CAPABILITIES];

const ROLE_CAPABILITIES: Record<string, Capability[]> = {
  student: [
    CAPABILITIES.studentRead,
    CAPABILITIES.attendanceSubmit,
    CAPABILITIES.prayerSubmit
  ],
  teacher: [
    CAPABILITIES.teacherRead,
    CAPABILITIES.attendanceRead,
    CAPABILITIES.attendanceSubmit,
    CAPABILITIES.studentManage
  ],
  staff: [CAPABILITIES.staffRead, CAPABILITIES.academicDirectoryRead],
  admin: [
    CAPABILITIES.adminRead,
    CAPABILITIES.schoolRead,
    CAPABILITIES.schoolManage,
    CAPABILITIES.serviceStatusManage,
    CAPABILITIES.studentManage,
    CAPABILITIES.staffManage,
    CAPABILITIES.teacherManage,
    CAPABILITIES.principalManage,
    CAPABILITIES.classroomManage,
    CAPABILITIES.academicPeriodManage,
    CAPABILITIES.academicDirectoryRead
  ],
  super_admin: [
    CAPABILITIES.adminRead,
    CAPABILITIES.schoolRead,
    CAPABILITIES.schoolManage,
    CAPABILITIES.serviceStatusManage,
    CAPABILITIES.studentManage,
    CAPABILITIES.staffManage,
    CAPABILITIES.teacherManage,
    CAPABILITIES.principalManage,
    CAPABILITIES.classroomManage,
    CAPABILITIES.academicPeriodManage,
    CAPABILITIES.academicDirectoryRead
  ],
  principal: [
    CAPABILITIES.principalRead,
    CAPABILITIES.schoolRead,
    CAPABILITIES.reportingRead,
    CAPABILITIES.classroomRead,
    CAPABILITIES.academicPeriodRead
  ]
};

export function getCapabilitiesForRole(role: string | null): Capability[] {
  if (!role) return [];
  return ROLE_CAPABILITIES[role] ?? [];
}
