import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { Role } from '../authentication/authentication.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Competence } from '../competences/Competence';
import { UserCompetences } from '../user-competences/UserCompetences';
import { Badges } from '../badges/Badges';
import { Mission } from '../missions/Mission';
import { Formations } from '../formations/Formations';
import { Sites } from '../WebAnalytics/sites/Sites';
import { TagsController } from '../tags/tags.controller';
import { Tag } from '../tags/Tag';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true})
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  @IsString()
  firstname: string;

  @Column()
  @IsString()
  lastname: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  public role: Role;

  @Column({ default: false })
  @IsBoolean()
  isValid: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => Mission, (mission) => mission.user, { nullable: true })
  missions: Mission[];

  @OneToMany(() => UserCompetences, (userCompetence) => userCompetence.user)
  userCompetences: UserCompetences[];

  // @ManyToMany(() => Badges)
  // @JoinTable()
  // Badges: Badges[]

  @OneToMany(() => Sites, (site) => site.user)
  sites: Sites[]

  @OneToMany(() => Tag, (tag) => tag.user)
  tags: Tag[]

  @ManyToMany(() => Badges, (badge) => badge.users)
  @JoinTable()
  badges: Badges[]

  @ManyToMany(() => Formations, (formation) => formation.users)
  @JoinTable()
  formations: Formations[]
}
