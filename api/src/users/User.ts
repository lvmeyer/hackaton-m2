import { IsEmail } from 'class-validator';
import { Role } from '../authentication/authentication.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Competence } from '../competences/Competence';
import { Badges } from '../badges/Badges';

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

  @ManyToMany(() => Competence)
  @JoinTable()
  competences: Competence[];

  @ManyToMany(() => Badges)
  @JoinTable()
  Badges: Badges[]
}
