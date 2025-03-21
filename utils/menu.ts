import { Menu, MenuRange } from "@grammyjs/menu";
import { BotContext } from "./session-storage";
import { getCodeController } from "../controllers/get-code";
import { CodeType, DbCode, deleteCode } from "./codes-helper";
import { generateCaption } from "./caption-helper";
import { UserRole } from "./auth-helper";
import { ManageUserAction } from "../controllers/manage-user";

export const addCodeMenu = new Menu<BotContext>("add-code-menu")
  .text("Memership Card", async (ctx: BotContext) => {
    await ctx.conversation.enter("add-code", {
      ...ctx.session.addCode,
      type: CodeType.membership,
    });
  })
  .row()
  .text("Gift Card", async (ctx: any) => {
    await ctx.conversation.enter("add-code", {
      ...ctx.session.addCode,
      type: CodeType.giftCard,
    });
  });

export const listCodeMenu = new Menu<BotContext>("list-code-menu");
listCodeMenu.dynamic((ctx: BotContext) => {
  const range = new MenuRange<BotContext>();
  const res = ctx.session.listCode;

  for (let i = 0; i < res.length; i++) {
    const code = res[i];
    const label = generateCaption(code);
    range
      .text(label, (ctx) => {
        ctx.session.getCode = code;
        getCodeController(ctx);
      })
      .row();
  }
  return range;
});

export const confirmMenu = new Menu<BotContext>("confirm-menu")
  .text("💀 Delete", async (ctx: BotContext) => {
    if (ctx.session.deleteCode !== undefined) {
      await deleteCode((ctx.session.deleteCode as DbCode).id);
      ctx.reply("✅ Code deleted successfully");
    }
  })
  .row()
  .text("Cancel", async (ctx: BotContext) => {
    ctx.session.deleteCode = undefined;
    ctx.reply("Action cancelled");
  });

export const deleteCodeMenu = new Menu<BotContext>("delete-code-menu");
deleteCodeMenu.dynamic((ctx: BotContext) => {
  const range = new MenuRange<BotContext>();
  const res = ctx.session.listCode;
  for (const code of res) {
    const label = generateCaption(code);
    range
      .text(label, (ctx) => {
        ctx.session.deleteCode = code;
        ctx.reply("❔ Are you sure you want to delete this code", {
          reply_markup: confirmMenu,
        });
      })
      .row();
  }
  return range;
});

export const addUserMenu = new Menu<BotContext>("add-user-menu")
  .text("Restricted User", async (ctx: BotContext) => {
    await ctx.conversation.enter("manage-user", {
      action: ManageUserAction.add,
      role: UserRole.RestrictedUser,
    });
  })
  .row()
  .text("User", async (ctx: BotContext) => {
    await ctx.conversation.enter("manage-user", {
      action: ManageUserAction.add,
      role: UserRole.User,
    });
  })
  .row()
  .text("Admin", async (ctx: BotContext) => {
    await ctx.conversation.enter("manage-user", {
      action: ManageUserAction.add,
      role: UserRole.Admin,
    });
  });
