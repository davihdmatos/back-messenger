import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import { schema } from "./schema.js";
import { defineRelations } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL || "");

const relations = defineRelations(schema, (r) => ({
  messages: {
    sender: r.one.users({
      from: r.messages.senderId,
      to: r.users.id,
    }),
    conversation: r.one.conversations({
      from: r.messages.conversationId,
      to: r.conversations.id,
    }),
  },
  users: {
    messages: r.many.messages(),
    participations: r.many.participants(),
  },

  participants: {
    participant: r.one.users({
      from: r.participants.userId,
      to: r.users.id,
    }),
    conversation: r.one.conversations({
      from: r.participants.conversationId,
      to: r.conversations.id,
    }),
  },
  conversations: {
    messages: r.many.messages(),
    participants: r.many.participants(),
  },
}));

export const db = drizzle({
  client: sql,
  casing: "snake_case",
  schema,
  relations,
});
