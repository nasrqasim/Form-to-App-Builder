const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const adminEmail = 'Admin@fromtobuilder.com';
    const adminPassword = 'AdminAiForm3456';

    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            role: 'ADMIN',
        },
        create: {
            email: adminEmail,
            // Assuming default role is USER in schema, override it
            role: 'ADMIN',
            plan: 'PRO', // Admin should have PRO access
            password: hashedPassword,
        },
    });

    console.log('Admin user seeded:', admin);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
