import type { Request, Response } from "express";
import { db } from "../db/database.js";

const findByConversation = async (req: Request, res: Response) => {
  const { conversationId } = req.params;

  if (!conversationId || typeof conversationId !== "string") {
    res.status(400);
    return res.json({ message: "Bad Request" });
  }

  const messages = await db.query.messages.findMany({
    where: {
      conversationId,
    },
    columns: {
      id: true,
      text: true,
      senderId: true,
    },
  });

  return res.json(messages);
};

export default { findByConversation };
