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

    @Column({nullable: true})
    former: string;
  

    @ManyToMany(() => User, (user) => user.formations)
    users: User[]
  }
  