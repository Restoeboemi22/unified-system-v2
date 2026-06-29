import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const now = new Date();

  console.log('Seeding Academic Directory Database...');

  await prisma.student.upsert({
    where: {
      schoolId_studentNumber: {
        schoolId: 'school_001',
        studentNumber: 'S-001',
      },
    },
    update: {},
    create: {
      studentId: 'std_001',
      schoolId: 'school_001',
      studentNumber: 'S-001',
      fullName: 'Demo Student',
      status: 'active',
      createdAt: now,
      updatedAt: now,
    },
  });

  await prisma.teacher.upsert({
    where: {
      schoolId_employeeNumber: {
        schoolId: 'school_001',
        employeeNumber: 'T-001',
      },
    },
    update: {},
    create: {
      teacherId: 'tch_001',
      schoolId: 'school_001',
      employeeNumber: 'T-001',
      fullName: 'Demo Teacher',
      subjectLabels: JSON.stringify(['Matematika']),
      status: 'active',
      createdAt: now,
      updatedAt: now,
    },
  });

  await prisma.staff.upsert({
    where: {
      schoolId_employeeNumber: {
        schoolId: 'school_001',
        employeeNumber: 'SF-001',
      },
    },
    update: {},
    create: {
      staffId: 'stf_001',
      schoolId: 'school_001',
      employeeNumber: 'SF-001',
      fullName: 'Demo Staff',
      positionTitle: 'Operator Sekolah',
      status: 'active',
      createdAt: now,
      updatedAt: now,
    },
  });

  await prisma.principal.upsert({
    where: {
      principalId: 'prc_001',
    },
    update: {},
    create: {
      principalId: 'prc_001',
      schoolId: 'school_001',
      appointmentCode: 'SK-PRINCIPAL-001',
      fullName: 'Demo Principal',
      status: 'active',
      createdAt: now,
      updatedAt: now,
    },
  });

  await prisma.academicPeriod.upsert({
    where: {
      schoolId_yearLabel_semesterLabel: {
        schoolId: 'school_001',
        yearLabel: '2026/2027',
        semesterLabel: 'ganjil',
      },
    },
    update: {},
    create: {
      academicPeriodId: 'ap_2026_ganjil',
      schoolId: 'school_001',
      yearLabel: '2026/2027',
      semesterLabel: 'ganjil',
      startDate: new Date('2026-07-01T00:00:00.000Z'),
      endDate: new Date('2026-12-31T23:59:59.000Z'),
      status: 'active',
      createdAt: now,
      updatedAt: now,
    },
  });

  await prisma.classroom.upsert({
    where: {
      schoolId_academicPeriodId_classroomName: {
        schoolId: 'school_001',
        academicPeriodId: 'ap_2026_ganjil',
        classroomName: '7A',
      },
    },
    update: {},
    create: {
      classroomId: 'cls_001',
      schoolId: 'school_001',
      academicPeriodId: 'ap_2026_ganjil',
      gradeLevel: '7',
      classroomName: '7A',
      homeroomTeacherId: 'tch_001',
      status: 'active',
      createdAt: now,
      updatedAt: now,
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
