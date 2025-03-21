import { getRole, requireRole, UserRole } from "../utils/auth-helper";
import { DbCode, listCode, listCodeByOwner } from "../utils/codes-helper";
import { errorHandler } from "../utils/error-handler";
import { deleteCodeMenu } from "../utils/menu";
import { BotContext } from "../utils/session-storage";
import { GetCodeTypes } from "./list-codes";

export const deleteCodeController = async (ctx: BotContext) => {
  try {
    await requireRole(ctx, UserRole.RestrictedUser);
    const role = await getRole(ctx);
    let codes: DbCode[] = [];
    if (role === UserRole.Admin) {
      codes = await listCode(GetCodeTypes.all);
    } else {
      const userId = ctx.from?.id as number;
      codes = await listCodeByOwner(userId);
    }
    if (codes.length === 0) {
      ctx.reply("🦭 You currently don't have any codes.");
    } else {
      ctx.session.listCode = codes;
      ctx.reply("Select the code to delete", {
        reply_markup: deleteCodeMenu,
      });
    }
  } catch (err) {
    errorHandler(ctx, err);
  }
};
