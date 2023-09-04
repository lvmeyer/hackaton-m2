import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from '../users/User';

@Entity()
export class Formations {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  former: string;

  @Column({ nullable: true }) // 1 JS - 2PHP - 3 C#
  language: number;

  @Column({ nullable: true })
  level: number;

  @ManyToMany(() => User, (user) => user.formations)
  users: User[];
}
