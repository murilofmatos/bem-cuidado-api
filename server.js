import { PrismaClient } from "./generated/prisma/index.js";
import bcrypt from "bcrypt";
import express from "express";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();

async function seed() {
  const workers = [
    {
      name: "Maria dos Santos",
      rating: 4.7,
      service: "Cozinheira",
      description: "Especialista em pratos caseiros e alimentação saudável.",
      category: "Cozinha",
    },
    {
      name: "João Pereira",
      rating: 4.2,
      service: "Churrasqueiro",
      description:
        "Atendo eventos e festas com carnes nobres e acompanhamentos.",
      category: "Cozinha",
    },
    {
      name: "Carla Mendes",
      rating: 3.9,
      service: "Babá noturna",
      description: "Experiência com crianças pequenas, paciente e carinhosa.",
      category: "Babá",
    },
    {
      name: "Lucas Oliveira",
      rating: 4.5,
      service: "Passeador de cães",
      description: "Amante dos animais, ofereço passeios diários e cuidados.",
      category: "Pets",
    },
    {
      name: "Ana Clara Silva",
      rating: 4.9,
      service: "Cuidadora de idosos",
      description:
        "Cuido com atenção e respeito, com experiência em medicação.",
      category: "Cuidado com Idosos",
    },
    {
      name: "Fernando Rocha",
      rating: 4.0,
      service: "Eletricista residencial",
      description: "Faço pequenos reparos elétricos e instalações simples.",
      category: "Pequenos Reparos",
    },
    {
      name: "Beatriz Lima",
      rating: 4.6,
      service: "Diarista",
      description: "Limpeza detalhada, rápida e confiável.",
      category: "Limpeza",
    },
    {
      name: "Carlos Eduardo",
      rating: 4.3,
      service: "Montador de móveis",
      description: "Especialista em montagem de móveis com agilidade.",
      category: "Pequenos Reparos",
    },
    {
      name: "Juliana Freitas",
      rating: 3.8,
      service: "Cozinheira vegana",
      description: "Preparo pratos veganos saborosos e nutritivos.",
      category: "Cozinha",
    },
    {
      name: "Rafael Nunes",
      rating: 4.1,
      service: "Zelador de pets",
      description: "Cuido de animais com carinho enquanto você viaja.",
      category: "Pets",
    },
    {
      name: "Tatiane Ribeiro",
      rating: 4.4,
      service: "Lavadora de roupas",
      description: "Cuido da sua lavanderia com zelo e pontualidade.",
      category: "Limpeza",
    },
    {
      name: "Marcos Vinícius",
      rating: 4.0,
      service: "Encanador",
      description: "Conserto de vazamentos e instalações hidráulicas simples.",
      category: "Pequenos Reparos",
    },
    {
      name: "Eliane Souza",
      rating: 4.8,
      service: "Babá de fim de semana",
      description: "Disponível para cuidar das crianças nos finais de semana.",
      category: "Babá",
    },
    {
      name: "Daniel Castro",
      rating: 3.7,
      service: "Cuidador de idosos noturno",
      description: "Acompanhamento e auxílio noturno com paciência e atenção.",
      category: "Cuidado com Idosos",
    },
    {
      name: "Luana Martins",
      rating: 4.6,
      service: "Cozinheira para eventos",
      description: "Buffet personalizado para pequenas confraternizações.",
      category: "Cozinha",
    },
    {
      name: "Rodrigo Lopes",
      rating: 3.9,
      service: "Pintor",
      description: "Pintura interna e externa com acabamento limpo.",
      category: "Pequenos Reparos",
    },
    {
      name: "Patrícia Gomes",
      rating: 4.2,
      service: "Babá em tempo integral",
      description: "Cuidado integral com atividades lúdicas e educativas.",
      category: "Babá",
    },
    {
      name: "Henrique Tavares",
      rating: 3.5,
      service: "Adestrador de cães",
      description: "Treinamento básico e reforço positivo para pets.",
      category: "Pets",
    },
    {
      name: "Viviane Dias",
      rating: 4.7,
      service: "Limpeza pós-obra",
      description: "Serviço completo de limpeza pesada e detalhada.",
      category: "Limpeza",
    },
    {
      name: "Tiago Almeida",
      rating: 4.3,
      service: "Jardinagem básica",
      description: "Corte de grama e cuidado com plantas pequenas.",
      category: "Pequenos Reparos",
    },
    {
      name: "Sônia Meireles",
      rating: 4.5,
      service: "Cozinheira funcional",
      description: "Alimentação saudável para dietas específicas.",
      category: "Cozinha",
    },
    {
      name: "André Mota",
      rating: 4.1,
      service: "Lavador de quintal",
      description: "Limpeza rápida e eficaz de áreas externas.",
      category: "Limpeza",
    },
    {
      name: "Larissa Cunha",
      rating: 3.6,
      service: "Babá bilíngue",
      description: "Cuido de crianças e ensino inglês básico.",
      category: "Babá",
    },
    {
      name: "Igor Fernandes",
      rating: 4.4,
      service: "Cuidar de idosos com mobilidade reduzida",
      description: "Auxílio total com carinho e responsabilidade.",
      category: "Cuidado com Idosos",
    },
    {
      name: "Natália Rezende",
      rating: 4.9,
      service: "Organizadora doméstica",
      description: "Organização de ambientes e otimização de espaços.",
      category: "Limpeza",
    },
  ];

  for (const worker of workers) {
    await prisma.worker.create({ data: worker });
  }

  console.log("✅ Workers seed completed!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(`Request: ${req.method} : ${req.url}`);
  next();
});

app.get("/", async (req, res) => {
  res.json({ message: "API is running" });
});

app.post("/users", async (req, res) => {
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

app.listen(3000, () => {
  console.log(`Servidor rodando...`);
});

app.get("/workers/popular", async (req, res) => {
  try {
    const workers = await prisma.worker.findMany({
      orderBy: {
        rating: "desc",
      },
      take: 10,
    });
    res.json(workers);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar trabalhadores" });
  }
});

app.get("/workers/categoria/:category", async (req, res) => {
  const category = req.params.category;
  try {
    const workers = await prisma.worker.findMany({
      where: {
        category: {
          contains: category,
        },
      },
    });
    res.json(workers);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar trabalhadores" });
  }
});

app.get("/workers/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const worker = await prisma.worker.findUnique({
      where: { id },
    });
    if (!worker) {
      return res.status(404).json({ error: "Trabalhador não encontrado" });
    }
    res.json(worker);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar trabalhador" });
  }
});
