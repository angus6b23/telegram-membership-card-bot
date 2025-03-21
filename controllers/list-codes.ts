import { requireRole, UserRole } from "../utils/auth-helper";
import { listCode } from "../utils/codes-helper";
import { errorHandler } from "../utils/error-handler";
import { listCodeMenu } from "../utils/menu";
import { BotContext } from "../utils/session-storage";

export enum GetCodeTypes {
  "membership",
  "giftCard",
  "all",
}

export const listCodeController =
  (codeType: GetCodeTypes) => async (ctx: BotContext) => {
    try {
      if (codeType === GetCodeTypes.all || codeType === GetCodeTypes.giftCard) {
        await requireRole(ctx, UserRole.User);
      } else {
        await requireRole(ctx, UserRole.RestrictedUser);
      }
      const res = await listCode(codeType);
      if (res.length === 0) {
        ctx.reply(
          "🦭 You currently don't have any codes.\nSend a code in photo to save it",
        );
        return;
      }
      ctx.session.listCode = res;
      ctx.reply("Here are all the codes.\nSelect to display code", {
        reply_markup: listCodeMenu,
      });
    } catch (err) {
      errorHandler(ctx, err);
    }
  };
