import { getRole } from "../utils/auth-helper";
import { codeCommands, genericCommands, userCommands } from "../utils/commands";
import { BotContext } from "../utils/session-storage";

export const startController = async (ctx: BotContext) => {
  const role = await getRole(ctx);
  const userId = ctx.from?.id;
  if (role === -1 && userId) {
    ctx.reply(
      `🦭 You are not registered to this bot yet\nYour user id is ${userId}, ask the owner of this bot to add you to view any codes available`,
    );
    ctx.setMyCommands(genericCommands as any);
  } else if (role !== -1) {
    if (role < 2) {
      ctx.setMyCommands([codeCommands, genericCommands] as any);
    } else {
      ctx.setMyCommands([userCommands, codeCommands, genericCommands] as any);
    }
    ctx.reply(
      "🦭 Welcome to the code bots. Send a photo with codes to save it as membership or gift cards.",
    );
  }
};
