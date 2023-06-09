import { IsEmail } from 'class-validator';
import { Role } from '../authentication/authentication.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Competence } from '../competences/Competence';
import { UserCompetences } from '../user-competences/UserCompetences';
import { Badges } from '../badges/Badges';
import { Mission } from '../missions/Mission';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  public role: Role;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => Mission, (mission) => mission.user, { nullable: true })
  missions: Mission[];

  @OneToMany(() => UserCompetences, (userCompetence) => userCompetence.user)
  userCompetences: UserCompetences[];

  @ManyToMany(() => Badges)
  @JoinTable()
  Badges: Badges[]
}
