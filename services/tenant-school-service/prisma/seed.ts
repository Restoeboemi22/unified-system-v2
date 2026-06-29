import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const now = new Date();

  console.log('Seeding Tenant School Database...');

  await prisma.school.upsert({
    where: { schoolId: 'school_001' },
    update: {},
    create: {
      schoolId: 'school_001',
      name: 'Demo School',
      status: 'active',
    },
  });

  await prisma.serviceStatus.upsert({
    where: { schoolId: 'school_001' },
    update: {},
    create: {
      schoolId: 'school_001',
      serviceStatus: 'active',
      reasonCode: null,
      reasonText: null,
      updatedAt: now,
    },
  });

  await prisma.identityAccount.upsert({
    where: {
      provider_idToken: {
        provider: 'firebase',
        idToken: 'TOKEN_DARI_PROVIDER',
      },
    },
    update: {},
    create: {
      provider: 'firebase',
      idToken: 'TOKEN_DARI_PROVIDER',
      userId: 'usr_student_demo',
      identityId: 'idn_student_demo',
    },
  });

  await prisma.identityAccount.upsert({
    where: {
      provider_idToken: {
        provider: 'firebase',
        idToken: 'ADMIN_TOKEN',
      },
    },
    update: {},
    create: {
      provider: 'firebase',
      idToken: 'ADMIN_TOKEN',
      userId: 'usr_admin_demo',
      identityId: 'idn_admin_demo',
    },
  });

  await prisma.identityAccount.upsert({
    where: {
      provider_idToken: {
        provider: 'firebase',
        idToken: 'SUPER_ADMIN_TOKEN',
      },
    },
    update: {},
    create: {
      provider: 'firebase',
      idToken: 'SUPER_ADMIN_TOKEN',
      userId: 'usr_super_admin_demo',
      identityId: 'idn_super_admin_demo',
    },
  });

  await prisma.membership.upsert({
    where: { membershipId: 'mem_student_demo' },
    update: {},
    create: {
      membershipId: 'mem_student_demo',
      userId: 'usr_student_demo',
      identityId: 'idn_student_demo',
      schoolId: 'school_001',
      role: 'student',
      status: 'active',
    },
  });

  await prisma.membership.upsert({
    where: { membershipId: 'mem_admin_demo' },
    update: {},
    create: {
      membershipId: 'mem_admin_demo',
      userId: 'usr_admin_demo',
      identityId: 'idn_admin_demo',
      schoolId: 'school_001',
      role: 'admin',
      status: 'active',
    },
  });

  await prisma.membership.upsert({
    where: { membershipId: 'mem_super_admin_demo' },
    update: {},
    create: {
      membershipId: 'mem_super_admin_demo',
      userId: 'usr_super_admin_demo',
      identityId: 'idn_super_admin_demo',
      schoolId: 'school_001', // Although super_admin manages all, they need an active tenant context to login successfully based on current code
      role: 'super_admin',
      status: 'active',
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
