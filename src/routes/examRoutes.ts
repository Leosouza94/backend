import { Router } from "express";
import { createExam, getUserExams, getAllExams } from "../controllers/examController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { upload } from "../uploadConfig"; // Importa o Multer que configuramos

const router = Router();

// Cria exame com upload de PDF
router.post(
  "/", 
  authMiddleware(["admin"]), 
  upload.single("file"), // middleware para receber o arquivo PDF
  createExam
);

// Pega os exames do usuário logado
router.get("/me", authMiddleware(["user", "admin"]), getUserExams);

// Pega todos os exames (apenas admin)
router.get("/", authMiddleware(["admin"]), getAllExams);

export default router;
