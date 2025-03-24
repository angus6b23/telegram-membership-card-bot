import "dotenv/config";
import { Bot, session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import { commands } from "@grammyjs/commands";
import {
  addCodeConversation,
  manageUserConversation,
} from "./utils/conversations";
import {
  addCodeMenu,
  addUserMenu,
  confirmMenu,
  deleteCodeMenu,
  listCodeMenu,
} from "./utils/menu";
import { addCodeController } from "./controllers/add-code";
import { BotContext, initialSessionData } from "./utils/session-storage";
import { textInputController } from "./controllers/search-code";
import {
  genericCommands,
  regularUserCommands,
  restrictedUserCommands,
  userCommands,
} from "./utils/commands";
import { CronJob } from "cron";
import { openDb, resetDb } from "./utils/init-db";

// Read bot token from env, exit if not found
const botToken = process.env.BOT_TOKEN;
if (!botToken) {
  console.error("Telegram Bot Token not set");
  process.exit(1);
}

// Create new instance of bot
export const bot = new Bot<BotContext>(botToken);

// Use Session plugin
bot.use(session({ initial: () => initialSessionData() }) as any);
bot.use(commands());

// Conversations
bot.use(conversations());
bot.use(createConversation(addCodeConversation, "add-code"));
bot.use(createConversation(manageUserConversation as any, "manage-user"));

// Menus
bot
  .use(addCodeMenu)
  .use(listCodeMenu)
  .use(addUserMenu)
  .use(confirmMenu)
  .use(deleteCodeMenu);

// Commands
bot
  .use(genericCommands)
  .use(userCommands)
  .use(restrictedUserCommands)
  .use(regularUserCommands);

// Add Membership code
bot.on(":photo", addCodeController);

// Search with text
bot.on(":text", textInputController);
bot.start();

new CronJob("33 */12 * * *", openDb, null, true);
