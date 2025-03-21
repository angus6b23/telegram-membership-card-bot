import { getRole, requireRole, UserRole } from "../utils/auth-helper";
import { detectCode } from "../utils/code-detect";
import { CodeType } from "../utils/codes-helper";
import { errorHandler } from "../utils/error-handler";
import { downloadFile } from "../utils/files-helper";
import { addCodeMenu } from "../utils/menu";
import { BotContext } from "../utils/session-storage";

export const addCodeController = async (ctx: BotContext) => {
  try {
    await requireRole(ctx, UserRole.RestrictedUser);
    const role = await getRole(ctx);
    const blob = await downloadFile(ctx);
    const code = await detectCode(blob);

    // Reply Error if code is not found on image
    if (!code) {
      ctx.reply("❌ No code found on image");
      return;
    }

    // Set session data for code
    ctx.session.addCode = {
      format: code.format,
      content: code.text,
    };

    if (role >= 1) {
      // User / admin can add membership and gift card
      ctx.reply("❔ Is it a membership card or gift card", {
        reply_markup: addCodeMenu,
      });
    } else {
      // Restricted user can only add membership
      ctx.conversation.enter("add-code", {
        ...ctx.session.addCode,
        type: CodeType.membership,
      });
    }
  } catch (err) {
    errorHandler(ctx, err);
  }
};
