import { CommandGroup } from "@grammyjs/commands";
import {
  addUserController,
  deleteUserController,
  listUserController,
} from "../controllers/manage-user";
import { BotContext } from "./session-storage";
import { listCodeController, GetCodeTypes } from "../controllers/list-codes";
import { startController } from "../controllers/instructions";
import { deleteCodeController } from "../controllers/delete-code";

export const userCommands = new CommandGroup<BotContext>();
userCommands.command("add_user", "Admin: Add a new user.", addUserController);
userCommands.command("list_user", "Admin: List all users", listUserController);
userCommands.command(
  "delete_user",
  "Admin: Delete a user",
  deleteUserController,
);

export const restrictedUserCommands = new CommandGroup<BotContext>();
restrictedUserCommands.command(
  "list_memberships",
  "Users: List all membership codes",
  listCodeController(GetCodeTypes.membership),
);
restrictedUserCommands.command(
  "delete_code",
  "Users: Delete a code you owned; Admin: Delete any codes",
  deleteCodeController,
);

export const regularUserCommands = new CommandGroup<BotContext>();
regularUserCommands.command(
  "list_gift_cards",
  "User / Admin: List all gift cards",
  listCodeController(GetCodeTypes.giftCard),
);
regularUserCommands.command(
  "list_codes",
  "User / Admin: List all codes",
  listCodeController(GetCodeTypes.all),
);

export const genericCommands = new CommandGroup<BotContext>();
genericCommands.command(
  "start",
  "Show introduction and permission",
  startController,
);
