import "reflect-metadata";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import examRoutes from "./routes/examRoutes";
import { AppDataSource } from "./ormconfig";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
// Permite acessar PDFs via navegador
app.use("/uploads", express.static("uploads"));

// Conexão com o banco
AppDataSource.initialize()
    .then(() => {
        console.log("Banco conectado com sucesso!");
        app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
    })
    .catch((err) => console.error("Erro ao conectar no banco:", err));
