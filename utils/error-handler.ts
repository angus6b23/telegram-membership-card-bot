import { BotContext } from "./session-storage";

export const errorHandler = (ctx: BotContext, err: unknown) => {
  const error = err as Error;
  if (error.message === "no_permission") {
    ctx.reply("❌ You do not have permission to do this");
  } else {
    console.error(error);
    ctx.reply("❌ Something went wrong");
  }
};
