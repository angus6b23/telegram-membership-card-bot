import { getRole, UserRole } from "../utils/auth-helper";
import {
  genericCommands,
  regularUserCommands,
  restrictedUserCommands,
  userCommands,
} from "../utils/commands";
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
    switch (role) {
      case UserRole.RestrictedUser:
        ctx.setMyCommands([restrictedUserCommands, genericCommands] as any);
        break;
      case UserRole.User:
        ctx.setMyCommands([
          regularUserCommands,
          restrictedUserCommands,
          genericCommands,
        ] as any);
        break;
      case UserRole.Admin:
        ctx.setMyCommands([
          userCommands,
          regularUserCommands,
          restrictedUserCommands,
          genericCommands,
        ] as any);
    }
    ctx.reply(
      "🦭 Welcome to the code bots. Send a photo with codes to save it as membership or gift cards.",
    );
  }
};
