import { CodeType, DbCode } from "./codes-helper";

export const generateCaption = (code: DbCode) => {
  const name = code.name;
  const prefix = code.type === CodeType.membership ? "🪪" : "🎁";
  const postfix = code.type === CodeType.giftCard ? `($${code.amount})` : "";
  return `${prefix} ${name} ${postfix}`;
};
