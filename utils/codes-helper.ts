import { GetCodeTypes } from "../controllers/list-codes";
import { db } from "./init-db";

export enum CodeType {
  "membership",
  "giftCard",
}

export interface Code {
  type: CodeType;
  name: string;
  format: string;
  content: string;
  amount?: number;
  user: number;
}

export interface DbCode extends Code {
  id: number;
  created_at: string;
}

export const writeCode = async (code: Code) => {
  const { type, name, format, content, amount, user } = code;
  if (type === CodeType.membership) {
    await db.run(
      "INSERT INTO codes (name, format, content, owner, type) VALUES (?, ?, ?, ?, ?)",
      [name, format, content, user, 0],
    );
  } else {
    await db.run(
      "INSERT INTO codes (name, format, content, owner, amount, type) VALUES (?, ?, ?, ?, ?, ?)",
      [name, format, content, user, amount, 1],
    );
  }
};

export const listCode = async (type: GetCodeTypes): Promise<DbCode[]> => {
  switch (type) {
    case GetCodeTypes.all:
      return await db.all("SELECT * from codes");
    case GetCodeTypes.membership:
      return await db.all("SELECT * from codes where type = 0");
    case GetCodeTypes.giftCard:
      return await db.all("SELECT * from codes where type = 1");
    default:
      throw new Error("Unknown type");
  }
};

export const readCode = async (id: number) => {
  const record = await db.get("SELECT * from codes where id = ?", [id]);
  return record as DbCode;
};

export const searchCode = async (
  searchTerm: string,
  type: GetCodeTypes,
): Promise<DbCode[]> => {
  const search = `%${searchTerm}%`;
  switch (type) {
    case GetCodeTypes.all:
      return await db.all("SELECT * from codes where name LIKE ?;", [search]);
    case GetCodeTypes.membership:
      return await db.all(
        "SELECT * from codes where name LIKE ? and type = 0",
        [search],
      );
    default:
      throw new Error("Unknown type");
  }
};

export const deleteCode = async (id: number) => {
  await db.run("DELETE from codes where id = ?", [id]);
};

export const updateCode = async (id: number, amount: number) => {
  await db.run("UPDATE codes SET amount = ? where id = ?", [amount, id]);
};
