import { db } from "./init-db";
import { BotContext } from "./session-storage";

export enum UserRole {
  "RestrictedUser",
  "User",
  "Admin",
}

export const ROLE_TO_STRING = ["Restricted User", "User", "Admin"] as const;

export const getRole = async (ctx: BotContext) => {
  const userId = ctx.from?.id;
  if (!userId) {
    throw new Error("User ID not found");
  }
  const record = await db.get("SELECT role FROM users WHERE id = ?", [userId]);
  if (!record) {
    return -1;
  } else {
    return record.role as UserRole;
  }
};

export const requireRole = async (ctx: BotContext, requiredRole: UserRole) => {
  const currentRole = await getRole(ctx);
  if (currentRole < requiredRole) {
    throw new Error("no_permission");
  }
};

export const addRole = async (userId: number, role: UserRole) => {
  await db.run("INSERT INTO users (id, role) values (?, ?)", [userId, role]);
};

export const removeRole = async (userId: number) => {
  await db.run("DELETE FROM users WHERE id = ?", [userId]);
};

export const getRoleById = async (id: number) => {
  const record = await db.get("SELECT role FROM users WHERE id = ?", [id]);
  if (!record) {
    return -1;
  } else {
    return record.role as UserRole;
  }
};

export const listRole = async () => {
  return await db.all("SELECT * FROM users");
};
