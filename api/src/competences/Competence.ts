import { IsString, IsBoolean } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
