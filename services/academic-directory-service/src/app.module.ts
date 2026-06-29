import { Module } from "@nestjs/common";
import { AcademicPeriodApplicationService } from "./application/academic-period-application.service";
import { HealthController } from "./presentation/health.controller";
import { AcademicPeriodController } from "./presentation/academic-period.controller";
import { ClassroomApplicationService } from "./application/classroom-application.service";
import { PrincipalApplicationService } from "./application/principal-application.service";
import { StaffApplicationService } from "./application/staff-application.service";
import { StudentController } from "./presentation/student.controller";
import { StudentApplicationService } from "./application/student-application.service";
import { TeacherApplicationService } from "./application/teacher-application.service";
import { PrismaAcademicPeriodStore } from "./infrastructure/prisma-academic-period-store";
import { SessionClient } from "./infrastructure/session-client";
import { PolicyClient } from "./infrastructure/policy-client";
import { PrismaClassroomStore } from "./infrastructure/prisma-classroom-store";
import { PrismaPrincipalStore } from "./infrastructure/prisma-principal-store";
import { PrismaService } from "./infrastructure/prisma.service";
import { PrismaStaffStore } from "./infrastructure/prisma-staff-store";
import { PrismaStudentStore } from "./infrastructure/prisma-student-store";
import { PrismaTeacherStore } from "./infrastructure/prisma-teacher-store";
import { ClassroomController } from "./presentation/classroom.controller";
import { PrincipalController } from "./presentation/principal.controller";
import { StaffController } from "./presentation/staff.controller";
import { TeacherController } from "./presentation/teacher.controller";

@Module({
  controllers: [
    HealthController,
    StudentController,
    PrincipalController,
    StaffController,
    TeacherController,
    ClassroomController,
    AcademicPeriodController
  ],
  providers: [
    AcademicPeriodApplicationService,
    ClassroomApplicationService,
    PrincipalApplicationService,
    StaffApplicationService,
    StudentApplicationService,
    TeacherApplicationService,
    SessionClient,
    PolicyClient,
    PrismaAcademicPeriodStore,
    PrismaClassroomStore,
    PrismaPrincipalStore,
    PrismaService,
    PrismaStaffStore,
    PrismaStudentStore,
    PrismaTeacherStore
  ]
})
export class AppModule {}
