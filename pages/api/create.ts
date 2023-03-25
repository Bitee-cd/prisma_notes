import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { content, title } = req.body;
  try {
    await prisma.note.create({
      data: {
        title,
        content,
      },
    });

    res.status(200).json({ message: "Note Created" });
  } catch (err) {
    console.log("Failure");
  }
}
