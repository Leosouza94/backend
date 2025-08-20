"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token)
            return res.status(401).json({ message: "Token não fornecido" });
        try {
            const secret = "SECRET_KEY";
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: "Acesso negado" });
            }
            next();
        }
        catch (err) {
            return res.status(401).json({ message: "Token inválido" });
        }
    };
};
exports.authMiddleware = authMiddleware;
