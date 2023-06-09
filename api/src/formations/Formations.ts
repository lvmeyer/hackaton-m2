import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable
  } from 'typeorm';
import { User } from '../users/User';
  
  @Entity()
  export class Formations {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    title: string;
  
    @ManyToMany(() => User)
    @JoinTable()
    former: User;
  
    @ManyToMany(() => User)
    @JoinTable()
    user: User[]
  }
  