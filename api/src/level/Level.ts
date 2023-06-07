import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { Mission } from "src/mission/Mission" ;

@Entity()
export class Level {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  level: string;

  // @OneToMany(() => Mission, (mission) => mission.level)
  // missions: Mission[]
}
