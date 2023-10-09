import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const PORT = 8000;

const prisma = new PrismaClient();

app.use(express.json());
app.post("/post", async (req, res) => {
  const { title, body } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      body,
    },
  });
  return res.json(post);
});

app.listen(PORT, () => {
  console.log("サーバーが起動中・・・");
});
