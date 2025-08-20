import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Exam {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    date: string;

    @Column()
    doctor: string;

    @Column({ default: "PROCESSANDO" })
    status: "PROCESSANDO" | "DISPONÍVEL";

    @Column({ nullable: true })
    fileUrl: string;

    @ManyToOne(() => User, user => user.exams)
    user: User;
}
