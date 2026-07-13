import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { PrismaService } from './prisma/prisma.service.js';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const prisma = app.get(PrismaService);

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
  await app.close();
}

bootstrap();
