import { IsDate, IsDecimal, IsString } from 'class-validator';
import { Competence } from '../competences/Competence';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Level } from '../level/Level';


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

    @ManyToOne(() => Level )
    level: Level;

    @ManyToMany(() => Competence)
    @JoinTable()
    competences: Competence[];


}
