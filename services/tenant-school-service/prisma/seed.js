const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const globalConfig = {
    school_year: "2025/2026",
    attendance_start_hour: 6,
    attendance_end_hour: 9,
    late_threshold_minutes: 15,
    features: {
      presensi_sholat: true,
      virtual_pet: false,
      halo_spentgapa: true,
    },
  };

  console.log("Seeding Tenant School Database...");

  await prisma.school.upsert({
    where: { schoolId: "school_001" },
    update: {},
    create: {
      schoolId: "school_001",
      name: "Demo School",
      status: "active",
    },
  });

  await prisma.serviceStatus.upsert({
    where: { schoolId: "school_001" },
    update: {},
    create: {
      schoolId: "school_001",
      serviceStatus: "active",
      reasonCode: null,
      reasonText: null,
      updatedAt: now,
    },
  });

  await prisma.identityAccount.upsert({
    where: {
      provider_idToken: {
        provider: "firebase",
        idToken: "TOKEN_DARI_PROVIDER",
      },
    },
    update: {},
    create: {
      provider: "firebase",
      idToken: "TOKEN_DARI_PROVIDER",
      userId: "usr_student_demo",
      identityId: "idn_student_demo",
    },
  });

  await prisma.identityAccount.upsert({
    where: {
      provider_idToken: {
        provider: "firebase",
        idToken: "ADMIN_TOKEN",
      },
    },
    update: {},
    create: {
      provider: "firebase",
      idToken: "ADMIN_TOKEN",
      userId: "usr_admin_demo",
      identityId: "idn_admin_demo",
    },
  });

  await prisma.identityAccount.upsert({
    where: {
      provider_idToken: {
        provider: "firebase",
        idToken: "SUPER_ADMIN_TOKEN",
      },
    },
    update: {},
    create: {
      provider: "firebase",
      idToken: "SUPER_ADMIN_TOKEN",
      userId: "usr_super_admin_demo",
      identityId: "idn_super_admin_demo",
    },
  });

  await prisma.membership.upsert({
    where: { membershipId: "mem_student_demo" },
    update: {},
    create: {
      membershipId: "mem_student_demo",
      userId: "usr_student_demo",
      identityId: "idn_student_demo",
      schoolId: "school_001",
      role: "student",
      status: "active",
    },
  });

  await prisma.membership.upsert({
    where: { membershipId: "mem_admin_demo" },
    update: {},
    create: {
      membershipId: "mem_admin_demo",
      userId: "usr_admin_demo",
      identityId: "idn_admin_demo",
      schoolId: "school_001",
      role: "admin",
      status: "active",
    },
  });

  await prisma.membership.upsert({
    where: { membershipId: "mem_super_admin_demo" },
    update: {},
    create: {
      membershipId: "mem_super_admin_demo",
      userId: "usr_super_admin_demo",
      identityId: "idn_super_admin_demo",
      schoolId: "school_001",
      role: "super_admin",
      status: "active",
    },
  });

  await prisma.gasGlobalConfig.upsert({
    where: { configKey: "default" },
    update: {},
    create: {
      configKey: "default",
      jsonText: JSON.stringify(globalConfig),
      updatedAt: now,
      updatedBy: "system_seed",
    },
  });

  await prisma.gasSyncJob.upsert({
    where: { gasSyncJobId: "job_seed_001" },
    update: {},
    create: {
      gasSyncJobId: "job_seed_001",
      type: "master_data",
      status: "DONE",
      schoolId: "school_001",
      note: "Sinkronisasi awal seed tenant-school-service",
      createdAt: now,
      updatedAt: now,
      createdBy: "system_seed",
    },
  });

  await prisma.gasBroadcast.upsert({
    where: { gasBroadcastId: "bc_seed_001" },
    update: {},
    create: {
      gasBroadcastId: "bc_seed_001",
      title: "Maintenance Server 2025",
      message: "Server akan mati jam 02.00",
      targetMode: "ALL",
      targetSchoolId: null,
      createdAt: now,
      createdBy: "system_seed",
    },
  });

  await prisma.gasSupportTicket.upsert({
    where: { gasSupportTicketId: "tkt_seed_001" },
    update: {},
    create: {
      gasSupportTicketId: "tkt_seed_001",
      type: "reset_access",
      schoolId: "school_001",
      reason: "Guru tidak bisa login setelah ganti perangkat.",
      status: "OPEN",
      createdAt: now,
      updatedAt: now,
      createdBy: "system_seed",
    },
  });

  await prisma.gasAuditEvent.upsert({
    where: { gasAuditEventId: "gaudit_seed_001" },
    update: {},
    create: {
      gasAuditEventId: "gaudit_seed_001",
      schoolId: "school_001",
      action: "gas.seed.completed",
      entity: "system",
      entityId: "seed",
      performedBy: "system_seed",
      details: JSON.stringify({ source: "tenant-school-service/prisma/seed.js" }),
      createdAt: now,
    },
  });

  console.log("Seeding completed!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
