import { text, pgTable, timestamp } from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id").notNull(),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  // TODO: Ayo this snippet is from drizzle however it doesn't return the expected value, how tf can the updatedAt happen before the createdAt
  updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
});