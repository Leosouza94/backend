import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: any;
}

export const authMiddleware = (roles: string[] = []) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Token não fornecido" });

        try {
            const secret = "SECRET_KEY";
            const decoded: any = jwt.verify(token, secret);
            req.user = decoded;

            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: "Acesso negado" });
            }

            next();
        } catch (err) {
            return res.status(401).json({ message: "Token inválido" });
        }
    };
};
