import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const PORT = 8000;

const prisma = new PrismaClient();

app.use(express.json());

app.get("/post/:id", async (req, res) => {
  const id = Number(req.params.id);
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return res.json(post);
});

app.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany();
  return res.json(posts);
});

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

app.patch("/post/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { title, body } = req.body;
  const updatedPost = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      body,
    },
  });
  return res.json(updatedPost);
});

app.listen(PORT, () => {
  console.log("サーバーが起動中・・・");
});
