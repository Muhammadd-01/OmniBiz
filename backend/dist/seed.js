"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_js_1 = require("./app.module.js");
const prisma_service_js_1 = require("./prisma/prisma.service.js");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_js_1.AppModule);
    const prisma = app.get(prisma_service_js_1.PrismaService);
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
//# sourceMappingURL=seed.js.map