import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany
} from 'typeorm';
import { User } from '../users/User';

@Entity()
export class Badges {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  badge: string;

  @Column()
  nb_point: number;

  @ManyToMany(() => User, (user) => user.formations)
  users: User[]
}
