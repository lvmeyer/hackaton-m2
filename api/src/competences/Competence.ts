import { IsString, IsBoolean } from 'class-validator';
import { User } from '../users/User';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Competence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsString()
  competence: string;

  @Column()
  @IsBoolean()
  type: boolean;
}
