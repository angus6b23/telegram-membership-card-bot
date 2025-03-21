import { getRole, requireRole, UserRole } from "../utils/auth-helper";
import { DbCode, searchCode } from "../utils/codes-helper";
import { errorHandler } from "../utils/error-handler";
import { listCodeMenu } from "../utils/menu";
import { BotContext } from "../utils/session-storage";
import { getCodeController } from "./get-code";
import { GetCodeTypes } from "./list-codes";
import { modifyCodeAmountController } from "./modify-code";

export const textInputController = async (ctx: BotContext) => {
  try {
    await requireRole(ctx, UserRole.User);
    const hasReply = ctx.message?.reply_to_message?.message_id;
    if (hasReply && ctx.session.messageIds.has(hasReply)) {
      const codeId = ctx.session.messageIds.get(hasReply) as number;
      const amount = Number(ctx.message.text);
      if (!isNaN(amount)) {
        await modifyCodeAmountController(ctx, { id: codeId, amount });
        return;
      }
    }
    await searchCodeController(ctx);
  } catch (err) {
    errorHandler(ctx, err);
  }
};

export const searchCodeController = async (ctx: BotContext) => {
  try {
    await requireRole(ctx, UserRole.User);
    const role = await getRole(ctx);

    if (!ctx.message?.text) {
      throw new Error("No Search Term");
    }
    if (role < 0) {
      throw new Error("No permission");
    }
    let codes: DbCode[] = [];
    if (role == 0) {
      codes = await searchCode(ctx.message.text, GetCodeTypes.membership);
    } else {
      codes = await searchCode(ctx.message.text, GetCodeTypes.all);
    }
    if (codes.length === 0) {
      ctx.reply("🦭 No codes found.");
    } else if (codes.length === 1) {
      ctx.session.getCode = codes[0];
      getCodeController(ctx);
    } else {
      ctx.session.listCode = codes;
      ctx.reply("Here are the codes.\nSelect to display code", {
        reply_markup: listCodeMenu,
      });
    }
  } catch (err) {
    console.error(err);
    ctx.reply("❌ Something went wrong");
  }
};
