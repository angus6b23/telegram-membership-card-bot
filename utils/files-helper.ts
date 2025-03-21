import { Context } from "grammy";

export const downloadFile = async (ctx: Context) => {
  const fileDetails = await ctx.getFile();
  if (!fileDetails) {
    throw new Error("File not found");
  }

  const blob = await fetch(
    `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${fileDetails.file_path}`,
  ).then((res) => res.blob());
  if (!blob) {
    throw new Error("Fail to download file");
  }
  return blob;
};
