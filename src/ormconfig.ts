import { DataSource } from "typeorm";
import { Exam } from "./entities/Exam";
import { User } from "./entities/User";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",//"IFuP95ibs1hICIF",
    database: "saudebarceloserios",
    synchronize: false, // para criar tabelas automaticamente (só em dev)
    logging: false,
    entities: [User, Exam],
});
