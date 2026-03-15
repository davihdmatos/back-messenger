import type { Request, Response } from "express";
import { db } from "../db/database.js";

const findByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId || typeof userId !== "string") {
    res.status(400);
    return res.json({ message: "Bad request." });
  }

  const conversations = await db.query.conversations.findMany({
    where: {
      participants: {
        userId,
      },
    },
    columns: { id: true },
    with: {
      participants: {
        columns: {},
        with: {
          participant: {
            columns: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return res.json(conversations);
};

export default { findByUser };
