import { listRole, requireRole, UserRole } from "../utils/auth-helper";
import { errorHandler } from "../utils/error-handler";
import { addUserMenu } from "../utils/menu";
import { BotContext } from "../utils/session-storage";

export const addUserController = async (ctx: BotContext) => {
  try {
    await requireRole(ctx, UserRole.Admin);
    await ctx.reply("❔ Which type of user would you want to add?", {
      reply_markup: addUserMenu,
    });
  } catch (err) {
    errorHandler(ctx, err);
  }
};

export const deleteUserController = async (ctx: BotContext) => {
  try {
    await requireRole(ctx, UserRole.Admin);
    await ctx.conversation.enter("manage-user", {
      action: ManageUserAction.delete,
    });
  } catch (err) {
    errorHandler(ctx, err);
  }
};

export const listUserController = async (ctx: BotContext) => {
  try {
    await requireRole(ctx, UserRole.Admin);
    const roles = await listRole();
    const separatedRoles = roles.reduce(
      (acc, cur) => {
        acc[cur.role].push(cur.id);
        return acc;
      },
      [[], [], []],
    );
    const replyString = `Admin:\n${separatedRoles[2].join("\n")}\nUsers:\n${separatedRoles[1].join("\n")}\nRestricted Users:\n${separatedRoles[0].join("\n")}`;
    ctx.reply(replyString);
  } catch (err) {
    errorHandler(ctx, err);
  }
};

export enum ManageUserAction {
  "add",
  "delete",
}
