import { IsDate, IsDecimal, IsString } from 'class-validator';
import { Competence } from '../competences/Competence';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Level } from '../level/Level';
import { User } from '../users/User';


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
    @IsString()
    entreprise: string;

    @Column()
    startMission: Date;

    @Column()
    endMission: Date;

    @ManyToOne(() => Level, {nullable: true} )
    level: Level;

    @ManyToOne(() => User, {nullable: true} )
    user: User;

    @ManyToMany(() => Competence)
    @JoinTable()
    competences: Competence[];
}
