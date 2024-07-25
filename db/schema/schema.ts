import { text, pgTable, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  category: text("category").notNull(),
  type: text("type"),
  customAccountName: text("custom_account_name"),
  customTypeName: text("custom_type_name"),
  userId: text("user_id").notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
});

export const insertAccountSchema = createInsertSchema(accounts, {
});