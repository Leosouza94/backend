import { DataSource } from "typeorm";
import { Exam } from "./entities/Exam";
import { User } from "./entities/User";
import dotenv from "dotenv";

dotenv.config(); // carrega variáveis do .env

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Exam],
});
