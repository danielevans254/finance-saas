import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { accounts } from '../db/schema/schema';
import { config } from 'dotenv';

config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const db = drizzle(pool);

async function seed() {
  await db.insert(accounts).values([
    { id: "1", plaidId: "1", name: 'John Doe', userId: "1" },
  ]);
  console.log('Seeding completed');
}

seed()
  .catch((err) => console.error(err))
  .finally(() => pool.end());