import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['info'] });

async function main() {
  console.log('Seeding database...');

  const modules = [
    { code: 'RESTAURANT', name: 'Restaurant & Cafe', description: 'Menu, Tables, POS' },
    { code: 'RETAIL', name: 'Retail Store', description: 'Inventory, POS, Barcodes' },
    { code: 'HEALTHCARE', name: 'Healthcare Clinic', description: 'Appointments, Patients' },
    { code: 'GYM', name: 'Gym & Fitness', description: 'Memberships, Check-ins' },
  ];

  for (const mod of modules) {
    await prisma.businessModule.upsert({
      where: { code: mod.code },
      update: {},
      create: mod,
    });
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
