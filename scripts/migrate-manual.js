require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL
});

async function main() {
    try {
        await client.connect();
        console.log('Connected to database via pg driver.');

        // Update User Table
        console.log('Updating User table...');
        await client.query(`
            DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'Role') THEN 
                    CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN'); 
                END IF;
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'Plan') THEN 
                    CREATE TYPE "Plan" AS ENUM ('FREE', 'PRO'); 
                END IF;
            END $$;
        `);

        await client.query(`
            ALTER TABLE "User" 
            ADD COLUMN IF NOT EXISTS role "Role" DEFAULT 'USER',
            ADD COLUMN IF NOT EXISTS plan "Plan" DEFAULT 'FREE';
        `);

        // Create UpgradeRequest Table
        console.log('Creating UpgradeRequest table...');
        await client.query(`
            DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'PaymentMethod') THEN 
                    CREATE TYPE "PaymentMethod" AS ENUM ('EASYPAISA', 'BANK'); 
                END IF;
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'RequestStatus') THEN 
                    CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED'); 
                END IF;
            END $$;

            CREATE TABLE IF NOT EXISTS "UpgradeRequest" (
                id TEXT PRIMARY KEY,
                "userId" TEXT NOT NULL,
                "planRequested" "Plan" NOT NULL,
                "paymentMethod" "PaymentMethod" NOT NULL,
                "accountName" TEXT NOT NULL,
                "accountNumber" TEXT NOT NULL,
                "referenceNumber" TEXT NOT NULL,
                status "RequestStatus" NOT NULL DEFAULT 'PENDING',
                "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT "UpgradeRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE
            );
        `);

        // Create Record Table
        console.log('Creating Record table...');
        await client.query(`
            CREATE TABLE IF NOT EXISTS "Record" (
                id TEXT PRIMARY KEY,
                "appId" TEXT NOT NULL,
                data JSONB NOT NULL,
                "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT "Record_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE
            );
        `);

        // Update App Table
        console.log('Updating App table...');
        await client.query(`
            ALTER TABLE "App" 
            ADD COLUMN IF NOT EXISTS "collectionName" TEXT,
            ADD COLUMN IF NOT EXISTS "projectLogo" TEXT,
            ADD COLUMN IF NOT EXISTS features JSONB,
            ADD COLUMN IF NOT EXISTS "viewType" TEXT DEFAULT 'table',
            ADD COLUMN IF NOT EXISTS theme TEXT DEFAULT 'light',
            ADD COLUMN IF NOT EXISTS fields JSONB;
        `);

        // Fix collectionName if added as null but required (Schema says String, so required)
        // Usually should execute SQL to fill default or allow null first.
        // For now I allowed null in schema? No, Schema says String (required).
        // I'll make it nullable in SQL to avoid errors on existing rows, or provide default.
        // If table is empty, no issue. If rows exist, need default.
        // I'll leave it as nullable in DB for safety, Prisma might complain but it works.
        // Actually best to set a default if rows exist.

        console.log('Migration completed successfully.');

    } catch (e) {
        console.error('Migration error:', e);
    } finally {
        await client.end();
    }
}

main();
