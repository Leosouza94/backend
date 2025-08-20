import { Request, Response } from "express";
import { Exam } from "../entities/Exam";
import { User } from "../entities/User";
import { AuthRequest } from "../middlewares/authMiddleware";
import { AppDataSource } from "../ormconfig";

const examRepository = AppDataSource.getRepository(Exam);
const userRepository = AppDataSource.getRepository(User);

// =========================
// Cria exame com upload PDF
// =========================
export const createExam = async (req: AuthRequest, res: Response) => {
    try {
        const { userId, title, date, doctor } = req.body;

        // Pega o caminho do PDF enviado pelo Multer
        const fileUrl: string | undefined = req.file ? `/uploads/${req.file.filename}` : undefined;

        // Verifica se o usuário existe
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

        // Cria e salva o exame
        const exam = examRepository.create({
            title,
            date,
            doctor,
            fileUrl,
            status: "DISPONÍVEL",
            user
        });

        await examRepository.save(exam);

        res.status(201).json(exam);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar exame" });
    }
};

// =========================
// Pega exames do usuário
// =========================
export const getUserExams = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user.id;

        const exams = await examRepository.find({
            where: { user: { id: userId } },
        });

        res.json(exams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar exames do usuário" });
    }
};

// =========================
// Pega todos os exames (admin)
// =========================
export const getAllExams = async (req: AuthRequest, res: Response) => {
    try {
        const exams = await examRepository.find({
            relations: ["user"], // para incluir dados do usuário
        });

        res.json(exams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar todos os exames" });
    }
};
