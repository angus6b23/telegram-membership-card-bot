import { InputFile } from "grammy";
import { createCode } from "../utils/create-code";
import { BotContext } from "../utils/session-storage";
import os from "os";
import fs from "fs/promises";
import { generateCaption } from "../utils/caption-helper";
import { CodeType, readCode } from "../utils/codes-helper";
import { errorHandler } from "../utils/error-handler";
import { requireRole, UserRole } from "../utils/auth-helper";

export const getCodeController = async (ctx: BotContext) => {
  try {
    const { id, type } = ctx.session.getCode;
    if (type === CodeType.membership) {
      await requireRole(ctx, UserRole.RestrictedUser);
    } else if (type === CodeType.giftCard) {
      await requireRole(ctx, UserRole.User);
    }
    const code = await readCode(id);
    const data = await createCode({
      format: code.format,
      text: code.content,
    });
    if (!data) {
      throw new Error("Cannot create code");
    }
    const path = `${os.tmpdir()}/mb-bot-${id}.png`;
    await fs.writeFile(path, await data.bytes());
    const inputFile = new InputFile(path);

    const msg = await ctx.replyWithPhoto(inputFile, {
      caption: generateCaption(code),
    });
    if (type === CodeType.giftCard) {
      ctx.session.messageIds.set(msg.message_id, id);
    }
  } catch (err) {
    errorHandler(ctx, err);
  }
};
