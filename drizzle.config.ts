import { defineConfig } from "drizzle-kit";
import { config } from 'dotenv';

config({ path: '.env.local' });

if (!("DATABASE_URL" in process.env))
  throw new Error("DATABASE_URL not found on .env.local");

export default defineConfig({
  dialect: "postgresql", // This is the database you'll be using
  schema: "./db/schema/schema.ts", // This is for a schema file, note drizzle supports multiple schema files, this is only for one global schema file
  out: "./drizzle", // This is for the migration files
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});