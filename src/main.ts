import { Prisma, PrismaClient } from "@prisma/client";
import express, { json, Request, Response } from "express";
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
import dotenv from 'dotenv';

dotenv.config();
process.env.TOKEN_SECRET;

app.use(cors());
app.use(json());
const port = 3000;

const prisma = new PrismaClient();

app.get("/books", async (req, res) => {
  const getBooks = await prisma.book.findMany();
    res.json(getBooks);
});

app.get("/books/:id", async (req, res) => {
  const ids = parseInt(req.params.id);
  const getBook = await prisma.book.findUnique({
    where: {
      id: ids,
    },
  });
  return res.send(getBook);
});

app.get("/books", async (req, res) => {
  res.json(await prisma.book.findMany());
});

app.post("/book", async (req, res) => {
    const postMany = await prisma.book.create({
        data:{
            author:req.body.author,
            summary:req.body.summary,
            name:req.body.name
        }
    })
    res.send("True");
  });

app.post("/books", async (req, res) => {
  const createMany = await prisma.book.create({
    data: {
      author: req.body.author,
      summary:req.body.summary,
      name:req.body.name
    }
  })
  return res.send("True");
});

app.delete("/books/:id",async (req,res) => {
    const param = parseInt(req.params.id);
    const deleteBook =await prisma.book.delete({
        where: {
            id:param,
        },
    });
    return res.send("Silindi");
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
