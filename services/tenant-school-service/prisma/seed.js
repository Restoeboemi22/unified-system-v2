const { PrismaClient } = require("../generated/prisma");
const { createHash } = require("node:crypto");

const prisma = new PrismaClient();

const DEFAULT_SCHOOL_ADMIN_PASSWORD = "admin123";

const schoolSeeds = [
  { schoolId: "smpn_3_gedeg", name: "SMP GEDEG SWASTA", district: "Gedeg", npsn: "20502603" },
  { schoolId: "smpn_1_bangsal", name: "SMPN 1 BANGSAL", district: "Bangsal", npsn: "20502642" },
  { schoolId: "smpn_1_dawar_blandong", name: "SMPN 1 DAWARBLANDONG", district: "Dawar Blandong", npsn: "20502643" },
  { schoolId: "smpn_1_dlanggu", name: "SMPN 1 DLANGGU", district: "Dlanggu", npsn: "20502644" },
  { schoolId: "smpn_1_gedeg", name: "SMPN 1 GEDEG", district: "Gedeg", npsn: "20502645" },
  { schoolId: "smpn_1_gondang", name: "SMPN 1 GONDANG", district: "Gondang", npsn: "20502646" },
  { schoolId: "smpn_1_jatirejo", name: "SMPN 1 JATIREJO", district: "Jatirejo", npsn: "20502647" },
  { schoolId: "smpn_1_jetis", name: "SMPN 1 JETIS", district: "Jetis", npsn: "20502648" },
  { schoolId: "smpn_1_kemlagi", name: "SMPN 1 KEMLAGI", district: "Kemlagi", npsn: "20502649" },
  { schoolId: "smpn_1_kutorejo", name: "SMPN 1 KUTOREJO", district: "Kutorejo", npsn: "20502650" },
  { schoolId: "smpn_1_mojoanyar", name: "SMPN 1 MOJOANYAR", district: "Mojoanyar", npsn: "20502651" },
  { schoolId: "smpn_1_mojosari", name: "SMPN 1 MOJOSARI", district: "Mojosari", npsn: "20502652" },
  { schoolId: "smpn_1_ngoro", name: "SMPN 1 NGORO", district: "Ngoro", npsn: "20502653" },
  { schoolId: "smpn_1_pacet", name: "SMPN 1 PACET", district: "Pacet", npsn: "20502654" },
  { schoolId: "smpn_1_pungging", name: "SMPN 1 PUNGGING", district: "Pungging", npsn: "20502655" },
  { schoolId: "smpn_1_puri", name: "SMPN 1 PURI", district: "Puri", npsn: "20502638" },
  { schoolId: "smpn_1_sooko", name: "SMPN 1 SOOKO", district: "Sooko", npsn: "20502637" },
  { schoolId: "smpn_1_trawas", name: "SMPN 1 TRAWAS", district: "Trawas", npsn: "20502636" },
  { schoolId: "smpn_1_trowulan", name: "SMPN 1 TROWULAN", district: "Trowulan", npsn: "20502619" },
  { schoolId: "smpn_2_bangsal", name: "SMPN 2 BANGSAL", district: "Bangsal", npsn: "20502620" },
  { schoolId: "smpn_2_dawar_blandong", name: "SMPN 2 DAWARBLANDONG", district: "Dawar Blandong", npsn: "20502621" },
  { schoolId: "smpn_2_dlanggu", name: "SMPN 2 DLANGGU", district: "Dlanggu", npsn: "20502622" },
  { schoolId: "smpn_2_gedeg", name: "SMPN 2 GEDEG", district: "Gedeg", npsn: "20502623" },
  { schoolId: "smpn_2_gondang", name: "SMPN 2 GONDANG", district: "Gondang", npsn: "20502624" },
  { schoolId: "smpn_2_jatirejo", name: "SMPN 2 JATIREJO", district: "Jatirejo", npsn: "20502625" },
  { schoolId: "smpn_2_jetis", name: "SMPN 2 JETIS", district: "Jetis", npsn: "20502626" },
  { schoolId: "smpn_2_kemlagi", name: "SMPN 2 KEMLAGI", district: "Kemlagi", npsn: "70011144" },
  { schoolId: "smpn_2_kutorejo", name: "SMPN 2 KUTOREJO", district: "Kutorejo", npsn: "20502627" },
  { schoolId: "smpn_2_mojoanyar", name: "SMPN 2 MOJOANYAR", district: "Mojoanyar", npsn: "20502628" },
  { schoolId: "smpn_2_mojosari", name: "SMPN 2 MOJOSARI", district: "Mojosari", npsn: "20502629" },
  { schoolId: "smpn_2_ngoro", name: "SMPN 2 NGORO", district: "Ngoro", npsn: "20502630" },
  { schoolId: "smpn_2_pacet", name: "SMPN 2 PACET", district: "Pacet", npsn: "20502631" },
  { schoolId: "smpn_2_pungging", name: "SMPN 2 PUNGGING", district: "Pungging", npsn: "20502632" },
  { schoolId: "smpn_2_puri", name: "SMPN 2 PURI", district: "Puri", npsn: "70002096" },
  { schoolId: "smpn_2_sooko", name: "SMPN 2 SOOKO", district: "Sooko", npsn: "20502633" },
  { schoolId: "smpn_2_trawas", name: "SMPN 2 TRAWAS", district: "Trawas", npsn: "20502634" },
  { schoolId: "smpn_2_trowulan", name: "SMPN 2 TROWULAN", district: "Trowulan", npsn: "20502635" },
  { schoolId: "smpn_3_gondang", name: "SMPN 3 GONDANG", district: "Gondang", npsn: "20551769" },
  { schoolId: "smpn_3_kutorejo", name: "SMPN 3 KUTOREJO", district: "Kutorejo", npsn: "20502656" },
  { schoolId: "smpn_3_pacet", name: "SMPN 3 PACET", district: "Pacet", npsn: "20555784" },
  { schoolId: "smpn_3_ngoro", name: "SMPN 3 SATU ATAP NGORO", district: "Ngoro", npsn: "69872302" },
  { schoolId: "smpn_3_jatirejo", name: "SMPN SATU ATAP MANTING", district: "Jatirejo", npsn: "20555815" },
];

const legacyGeneratedSchoolIds = Array.from({ length: 39 }, (_, index) => `school_${String(index + 1).padStart(3, "0")}`);

async function cleanupLegacyGeneratedRegistry() {
  await prisma.serviceStatus.deleteMany({ where: { schoolId: { in: legacyGeneratedSchoolIds } } });
  await prisma.membership.deleteMany({ where: { schoolId: { in: legacyGeneratedSchoolIds } } });
  await prisma.auditLog.deleteMany({ where: { schoolId: { in: legacyGeneratedSchoolIds } } });
  await prisma.gasSyncJob.deleteMany({ where: { schoolId: { in: legacyGeneratedSchoolIds } } });
  await prisma.gasBroadcast.deleteMany({ where: { targetSchoolId: { in: legacyGeneratedSchoolIds } } });
  await prisma.gasSupportTicket.deleteMany({ where: { schoolId: { in: legacyGeneratedSchoolIds } } });
  await prisma.gasAuditEvent.deleteMany({ where: { schoolId: { in: legacyGeneratedSchoolIds } } });
  await prisma.school.deleteMany({ where: { schoolId: { in: legacyGeneratedSchoolIds } } });
}

function hashSchoolAdminPassword(password) {
  return createHash("sha256").update(password).digest("hex");
}

async function main() {
  const now = new Date();
  const defaultSchool = schoolSeeds.find((school) => school.schoolId === "smpn_3_pacet") || schoolSeeds[0];
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
  await cleanupLegacyGeneratedRegistry();

  for (const school of schoolSeeds) {
    await prisma.school.upsert({
      where: { schoolId: school.schoolId },
      update: {
        name: school.name,
        status: "active",
        district: school.district,
        npsn: school.npsn,
        authEmail: null,
        adminEmail: null,
        backupEmail: null,
        adminAccessActive: true,
        adminPasswordHash: hashSchoolAdminPassword(DEFAULT_SCHOOL_ADMIN_PASSWORD),
        adminMustChangePassword: true,
      },
      create: {
        schoolId: school.schoolId,
        name: school.name,
        status: "active",
        district: school.district,
        npsn: school.npsn,
        authEmail: null,
        adminEmail: null,
        backupEmail: null,
        adminAccessActive: true,
        adminPasswordHash: hashSchoolAdminPassword(DEFAULT_SCHOOL_ADMIN_PASSWORD),
        adminMustChangePassword: true,
      },
    });

    await prisma.serviceStatus.upsert({
      where: { schoolId: school.schoolId },
      update: {
        serviceStatus: "active",
        reasonCode: null,
        reasonText: null,
        updatedAt: now,
      },
      create: {
        schoolId: school.schoolId,
        serviceStatus: "active",
        reasonCode: null,
        reasonText: null,
        updatedAt: now,
      },
    });
  }

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
      schoolId: defaultSchool.schoolId,
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
      schoolId: defaultSchool.schoolId,
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
      schoolId: defaultSchool.schoolId,
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
      schoolId: defaultSchool.schoolId,
      note: "Sinkronisasi awal registry master 42 sekolah Mojokerto",
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
      schoolId: defaultSchool.schoolId,
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
      schoolId: defaultSchool.schoolId,
      action: "gas.seed.completed",
      entity: "system",
      entityId: "seed",
      performedBy: "system_seed",
      details: JSON.stringify({
        source: "tenant-school-service/prisma/seed.js",
        schoolCount: schoolSeeds.length,
        registrySource: "user-provided-master-list-42-mojokerto",
      }),
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
