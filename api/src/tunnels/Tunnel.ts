import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Tag } from '../tags/Tag';

@Entity()
export class Tunnel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comment: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
