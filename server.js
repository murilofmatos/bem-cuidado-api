import { PrismaClient } from "./generated/prisma/index.js";
import bcrypt from "bcrypt";
import express from "express";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.json({ message: "API is running" });
});

app.post("/users", async (req, res) => {
  console.log(req.body);
  const { name, email, senha } = req.body;
  if (!name || !email || !senha) {
    return res
      .status(400)
      .json({ error: "Nome, email e senha são obrigatórios" });
  }
  const hashedPassword = await bcrypt.hash(senha, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        senha: hashedPassword,
      },
    });
    res.status(201).json({
      success: "Usuário cadastrado com sucesso",
      user: { id: user.id, name, email },
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
});

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Email e/ou senha inválidos" });
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Email e/ou senha inválidos" });
    }

    res.json({ success: "Login realizado com sucesso", user });
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar login" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
