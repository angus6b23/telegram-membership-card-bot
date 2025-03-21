import "dotenv/config";
import { Bot, session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import { commands } from "@grammyjs/commands";
import {
  addCodeConversation,
  manageUserConversation,
} from "./utils/conversations";
import { addCodeMenu, addUserMenu, listCodeMenu } from "./utils/menu";
import { addCodeController } from "./controllers/add-code";
import { BotContext, initialSessionData } from "./utils/session-storage";
import { textInputController } from "./controllers/search-code";
import { codeCommands, genericCommands, userCommands } from "./utils/commands";

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
bot.use(addCodeMenu).use(listCodeMenu).use(addUserMenu);

// Commands
bot.use(genericCommands).use(codeCommands).use(userCommands);

// Add Membership code
bot.on(":photo", addCodeController);

// Search with text
bot.on(":text", textInputController);
bot.start();
