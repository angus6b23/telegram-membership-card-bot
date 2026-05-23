import { requireRole, UserRole } from "../utils/auth-helper";
import { readCode, deleteCode, updateCode } from "../utils/codes-helper";
import { errorHandler } from "../utils/error-handler";
import { round } from "../utils/round";
import { BotContext } from "../utils/session-storage";

interface ModifyCodeData {
  id: number;
  amount: number;
}
export const modifyCodeAmountController = async (
  ctx: BotContext,
  data: ModifyCodeData,
) => {
  try {
    await requireRole(ctx, UserRole.User);
    const code = await readCode(data.id);
    if (code.type === 0) {
      ctx.reply("Membership card does not support setting / deducting balance");
    }

    let newAmount = code.amount as number;
    if (data.amount > 0) {
      newAmount = data.amount;
    } else if (data.amount === 0) {
      newAmount = 0;
    } else {
      newAmount = round(newAmount + data.amount);
    }
    if (process.env.AUTO_REMOVE_ZERO_BALANCE && newAmount <= 0) {
      await deleteCode(code.id);
      ctx.reply(
        `🦭 ${code.name} no longer has any balance inside and is deleted`,
      );
    } else {
      await updateCode(code.id, newAmount);
      ctx.reply(`✅ ${code.name} now has $${newAmount} left`);
    }
  } catch (err) {
    errorHandler(ctx, err);
  }
};
