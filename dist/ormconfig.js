"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Exam_1 = require("./entities/Exam");
const User_1 = require("./entities/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "", //"IFuP95ibs1hICIF",
    database: "saudebarceloserios",
    synchronize: false, // para criar tabelas automaticamente (só em dev)
    logging: false,
    entities: [User_1.User, Exam_1.Exam],
});
