import { Request, Response } from "express";

import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../ormconfig";

const userRepository = AppDataSource.getRepository(User);

// Registra usuario
export const register = async (req: Request, res: Response) => {
    const { name, cpf, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({ name, cpf, email, password: hashedPassword, role });
    await userRepository.save(user);

    res.json({ message: "Usuário cadastrado com sucesso!" });
};


// Login
export const login = async (req: Request, res: Response) => {
    const { cpfOrEmail, password } = req.body;

    const user = await userRepository.findOne({ 
        where: [{ email: cpfOrEmail }, { cpf: cpfOrEmail }]
    });

    if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Senha incorreta" });

    const token = jwt.sign({ id: user.id, role: user.role }, "SECRET_KEY", { expiresIn: "1h" });
    res.json({ token, role: user.role, name: user.name });
};
