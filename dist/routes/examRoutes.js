"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const examController_1 = require("../controllers/examController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const uploadConfig_1 = require("../uploadConfig"); // Importa o Multer que configuramos
const router = (0, express_1.Router)();
// Cria exame com upload de PDF
router.post("/", (0, authMiddleware_1.authMiddleware)(["admin"]), uploadConfig_1.upload.single("file"), // middleware para receber o arquivo PDF
examController_1.createExam);
// Pega os exames do usuário logado
router.get("/me", (0, authMiddleware_1.authMiddleware)(["user", "admin"]), examController_1.getUserExams);
// Pega todos os exames (apenas admin)
router.get("/", (0, authMiddleware_1.authMiddleware)(["admin"]), examController_1.getAllExams);
exports.default = router;
