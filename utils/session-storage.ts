import { ConversationFlavor } from "@grammyjs/conversations";
import { Context, SessionFlavor } from "grammy";
import { DbCode } from "./codes-helper";
import { CommandsFlavor } from "@grammyjs/commands";

export interface AddCodeStorage {
  format: string;
  content: string;
}

export type ListCodeStorage = DbCode[];

export type GetCodeStorage = DbCode;

export type MessageIdsStorage = Map<number, number>;

export interface SessionData {
  addCode: AddCodeStorage;
  listCode: ListCodeStorage;
  getCode: GetCodeStorage;
  messageIds: MessageIdsStorage;
  userIdToAdd: number;
}

export const initialSessionData = () => ({
  addCode: {
    format: "",
    content: "",
  },
  listCode: [],
  getCode: {
    type: "",
    id: 0,
  },
  userIdToAdd: 0,
  messageIds: new Map(),
});

export type BotContext = ConversationFlavor<Context> &
  SessionFlavor<SessionData> &
  CommandsFlavor &
  Context;
