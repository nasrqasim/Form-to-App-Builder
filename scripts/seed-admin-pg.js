require('dotenv').config();
const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const client = new Client({
    connectionString: process.env.DATABASE_URL
});

async function main() {
    try {
        await client.connect();

        const adminEmail = 'Admin@fromtobuilder.com';
        const adminPassword = 'AdminAiForm3456';
        const hashedPassword = await bcrypt.hash(adminPassword, 12);

        const checkQuery = 'SELECT * FROM "User" WHERE email = $1';
        const checkRes = await client.query(checkQuery, [adminEmail.toLowerCase()]);

        if (checkRes.rows.length > 0) {
            console.log('Admin user already exists. Updating role...');
            const updateQuery = `
                UPDATE "User"
                SET role = 'ADMIN', plan = 'PRO'
                WHERE email = $1
            `;
            await client.query(updateQuery, [adminEmail.toLowerCase()]);
        } else {
            console.log('Creating admin user...');
            const insertQuery = `
                INSERT INTO "User" (id, email, password, role, plan, "createdAt")
                VALUES (gen_random_uuid(), $1, $2, 'ADMIN', 'PRO', NOW())
                RETURNING *
            `;
            await client.query(insertQuery, [adminEmail.toLowerCase(), hashedPassword]);
        }

        console.log('Admin user seeded successfully.');
    } catch (e) {
        console.error('Error seeding admin:', e);
    } finally {
        await client.end();
    }
}

main();
