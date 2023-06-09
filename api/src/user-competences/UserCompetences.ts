import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../users/User';
import { Competence } from '../competences/Competence';

@Entity()
export class UserCompetences {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    points: number;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Competence)
    competence: Competence;
}