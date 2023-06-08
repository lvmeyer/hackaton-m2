import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Badges {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  badge: string;

  @Column()
  nb_point: number;

}
