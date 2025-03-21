import { Conversation } from "@grammyjs/conversations";
import { Context } from "grammy";
import { CodeType, writeCode } from "./codes-helper";
import { ManageUserAction } from "../controllers/manage-user";
import {
  removeRole,
  getRoleById,
  UserRole,
  addRole,
  ROLE_TO_STRING,
} from "./auth-helper";
import { BotContext } from "./session-storage";

interface ConversationConfig {
  format: string;
  content: string;
  type: CodeType;
}

export const addCodeConversation = async (
  conversation: Conversation,
  ctx: Context,
  parameters: ConversationConfig,
) => {
  let name;
  let amount: number | undefined = undefined;

  // Ask User to provide name for membership / gift card
  while (!name) {
    await ctx.reply("Give a name to the code");
    const { message } = await conversation.waitFor("message:text");
    name = message.text.trim();
  }

  // Ask User to provide amount for gift card
  while (!amount && parameters.type === CodeType.giftCard) {
    await ctx.reply("Give an amount to the gift card");
    const { message } = await conversation.waitFor("message:text");
    amount = Number(message.text);
  }

  // Write into DB
  await conversation.external(async () => {
    writeCode({
      type: parameters.type,
      format: parameters.format,
      content: parameters.content,
      ...(amount && { amount }),
      name: name,
      user: ctx.from?.id as number,
    });
  });
  ctx.reply("✅ Code added");
  return;
};

export const manageUserConversation = async (
  conversation: Conversation,
  ctx: BotContext,
  parameters: { action: ManageUserAction; role?: UserRole },
) => {
  let id;
  const { action } = parameters;
  // Wait for user to input valid id
  while (!id) {
    await ctx.reply(
      `Input User ID to ${action === ManageUserAction.add ? "add" : "delete"}`,
    );
    const { message } = await conversation.waitFor("message:text");
    id = Number(message.text);
  }

  // Handle delete id
  if (action === ManageUserAction.delete) {
    if (id === Number(process.env.ADMIN_USER_ID)) {
      ctx.reply("❌ You cannot remove admin defined in environment");
    } else {
      conversation.external(async () => await removeRole(id));
      ctx.reply("✅ User Removed");
    }
  } else {
    // Handle add id
    const idRole = await conversation.external(
      async () => await getRoleById(id),
    );
    if (idRole !== -1) {
      ctx.reply(
        "❌ User already exist. To modify permission, remove the user then add again",
      );
      return;
    } else {
      const roleToAdd = parameters.role as UserRole;
      console.log(roleToAdd);
      await conversation.external(async () => await addRole(id, roleToAdd));
      ctx.reply(`✅ User ${id} added as ${ROLE_TO_STRING[roleToAdd]}`);
    }
  }
};
