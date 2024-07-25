import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth"
import { eq } from 'drizzle-orm';
import { zValidator } from "@hono/zod-validator"
import { v4 as uuidv4 } from 'uuid';
import { custom } from "zod";

const account = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({
        error: "Unauthorized"
      }, 401);
    }

    const data = await db
      .select({ id: accounts.id, name: accounts.name, category: accounts.category, type: accounts.type, customAccountName: accounts.customAccountName, customTypeName: accounts.customTypeName })
      .from(accounts)
      .where(eq(accounts.userId, auth.userId))
    return c.json({
      data
    });
  })
  .post("/", clerkMiddleware(), zValidator("json", insertAccountSchema.pick({ name: true, category: true, type: true })), async (c) => {
    const auth = getAuth(c);
    const values = c.req.valid("json")

    if (!auth?.userId) {
      return c.json({
        error: "Unauthorized"
      }, 401);
    }

    const [data] = await db.insert(accounts).values({
      id: uuidv4(),
      userId: auth.userId,
      ...values
    }).returning();
    return c.json({
      data
    });
  });

export default account;