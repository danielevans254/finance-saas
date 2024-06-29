import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema/schema";

const account = new Hono().get("/", async (c) => {
  const data = await db
    .select({ id: accounts.id, name: accounts.name })
    .from(accounts)
  return c.json({
    data
  });
});

export default account;