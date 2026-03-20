import { index, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { timestamps } from "../db/helpers/columns.js";
import { users } from "./users.js";
import { conversations } from "./conversations.js";

export const messages = pgTable(
  "messages",
  {
    id: uuid().primaryKey().defaultRandom(),

    senderId: uuid()
      .notNull()
      .references(() => users.id),

    conversationId: uuid()
      .notNull()
      .references(() => conversations.id),

    text: text().notNull(),

    ...timestamps,
  },
  (t) => [
    index("messages_sender_id_idx").on(t.senderId),
    index("messages_conversation_id_idx").on(t.conversationId),
  ],
);
