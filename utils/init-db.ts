import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import fs from "fs";

//Create the DB if not exist
if (!fs.existsSync("./data/database.db")) {
  new sqlite3.Database("./data/database.db");
}

export let db: Database;

export const openDb = async () => {
  db = await open<sqlite3.Database, sqlite3.Statement>({
    filename: "./data/database.db",
    driver: sqlite3.Database,
  });
  await db.migrate({
    migrationsPath: "./migrations",
  });
  if (process.env.NODE_ENV !== "testing") {
    if (!process.env.ADMIN_USER_ID) {
      console.error(
        "ADMIN_USER_ID not set, nobody can access the bot right now!!",
      );
    } else {
      await db.run("INSERT OR IGNORE INTO users (id, role) VALUES (?, 2)", [
        process.env.ADMIN_USER_ID,
      ]);
    }
  }
};
openDb();
