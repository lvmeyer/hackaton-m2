import { IsString } from 'class-validator';
import { User } from '../../users/User';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsString()
  link: string;

  @ManyToOne(() => User)
  user: User;
}
