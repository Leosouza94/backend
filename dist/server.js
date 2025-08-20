"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const examRoutes_1 = __importDefault(require("./routes/examRoutes"));
const ormconfig_1 = require("./ormconfig");
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rotas
app.use("/api/auth", authRoutes_1.default);
app.use("/api/exams", examRoutes_1.default);
// Permite acessar PDFs via navegador
app.use("/uploads", express_1.default.static("uploads"));
// Conexão com o banco
ormconfig_1.AppDataSource.initialize()
    .then(() => {
    console.log("Banco conectado com sucesso!");
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
})
    .catch((err) => console.error("Erro ao conectar no banco:", err));
