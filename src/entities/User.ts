import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Exam } from "./Exam";

export type UserRole = "admin" | "user";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    cpf: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: "enum", enum: ["admin", "user"], default: "user" })
    role: UserRole;

    @OneToMany(() => Exam, exam => exam.user)
    exams: Exam[];
}
