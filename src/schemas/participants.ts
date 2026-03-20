import { index, pgTable, uuid } from "drizzle-orm/pg-core";

import { users } from "./users.js";
import { conversations } from "./conversations.js";
import { uniqueIndex } from "drizzle-orm/cockroach-core";

export const participants = pgTable(
  "participants",
  {
    id: uuid().primaryKey().defaultRandom(),

    conversationId: uuid()
      .notNull()
      .references(() => conversations.id),

    userId: uuid()
      .notNull()
      .references(() => users.id),
  },
  (t) => [
    index("participants_user_id_idx").on(t.userId),
    index("participants_conversation_id_idx").on(t.conversationId),
    uniqueIndex("unique_user_per_conv").on(t.userId, t.conversationId),
  ],
);
