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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ormconfig_1 = require("../ormconfig");
const userRepository = ormconfig_1.AppDataSource.getRepository(User_1.User);
// Registra usuario
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, cpf, email, password, role } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = userRepository.create({ name, cpf, email, password: hashedPassword, role });
    yield userRepository.save(user);
    res.json({ message: "Usuário cadastrado com sucesso!" });
});
exports.register = register;
// Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cpfOrEmail, password } = req.body;
    const user = yield userRepository.findOne({
        where: [{ email: cpfOrEmail }, { cpf: cpfOrEmail }]
    });
    if (!user)
        return res.status(400).json({ message: "Usuário não encontrado" });
    const isValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isValid)
        return res.status(400).json({ message: "Senha incorreta" });
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, "SECRET_KEY", { expiresIn: "1h" });
    res.json({ token, role: user.role, name: user.name });
});
exports.login = login;
