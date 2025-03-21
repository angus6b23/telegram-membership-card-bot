import { CommandGroup } from "@grammyjs/commands";
import {
  addUserController,
  deleteUserController,
  listUserController,
} from "../controllers/manage-user";
import { BotContext } from "./session-storage";
import { listCodeController, GetCodeTypes } from "../controllers/list-codes";
import { startController } from "../controllers/instructions";

export const userCommands = new CommandGroup<BotContext>();
userCommands.command("add_user", "Admin: Add a new user.", addUserController);
userCommands.command("list_user", "Admin: List all users", listUserController);
userCommands.command(
  "delete_user",
  "Admin: Delete a user",
  deleteUserController,
);

export const codeCommands = new CommandGroup<BotContext>();
codeCommands.command(
  "list_memberships",
  "All Users: List all membership codes",
  listCodeController(GetCodeTypes.membership),
);
codeCommands.command(
  "list_gift_cards",
  "User / Admin: List all gift cards",
  listCodeController(GetCodeTypes.giftCard),
);
codeCommands.command(
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
