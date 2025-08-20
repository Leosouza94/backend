"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllExams = exports.getUserExams = exports.createExam = void 0;
const Exam_1 = require("../entities/Exam");
const User_1 = require("../entities/User");
const ormconfig_1 = require("../ormconfig");
const examRepository = ormconfig_1.AppDataSource.getRepository(Exam_1.Exam);
const userRepository = ormconfig_1.AppDataSource.getRepository(User_1.User);
// =========================
// Cria exame com upload PDF
// =========================
const createExam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, title, date, doctor } = req.body;
        // Pega o caminho do PDF enviado pelo Multer
        const fileUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
        // Verifica se o usuário existe
        const user = yield userRepository.findOne({ where: { id: userId } });
        if (!user)
            return res.status(404).json({ message: "Usuário não encontrado" });
        // Cria e salva o exame
        const exam = examRepository.create({
            title,
            date,
            doctor,
            fileUrl,
            status: "DISPONÍVEL",
            user
        });
        yield examRepository.save(exam);
        res.status(201).json(exam);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar exame" });
    }
});
exports.createExam = createExam;
// =========================
// Pega exames do usuário
// =========================
const getUserExams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const exams = yield examRepository.find({
            where: { user: { id: userId } },
        });
        res.json(exams);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar exames do usuário" });
    }
});
exports.getUserExams = getUserExams;
// =========================
// Pega todos os exames (admin)
// =========================
const getAllExams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exams = yield examRepository.find({
            relations: ["user"], // para incluir dados do usuário
        });
        res.json(exams);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar todos os exames" });
    }
});
exports.getAllExams = getAllExams;
