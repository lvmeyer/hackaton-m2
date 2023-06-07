import { IsDate, IsDecimal, IsString } from 'class-validator';
import { Competence } from '../competences/Competence';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mission {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsString()
    title: string;

    @Column({type: 'text'})
    @IsString()
    description: string;

    @Column()
    @IsDecimal()
    points: number;

    @Column()
    @IsDate()
    startMission: Date;

    @Column()
    @IsDate()
    endMission: Date;

    @ManyToMany(() => Competence)
    @JoinTable()
    competences: Competence[];
}
