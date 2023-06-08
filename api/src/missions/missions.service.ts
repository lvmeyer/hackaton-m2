import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Mission } from './Mission';
  import { Competence } from '../competences/Competence';
  import { Repository } from 'typeorm';
  import {
    CreateMissionRequest,
    UpdateMissionRequest,
  } from './dto/missions.request';
  import { Level } from '../level/Level';
import { User } from '../users/User';
  
  @Injectable()
  export class MissionsService {
    constructor(
      @InjectRepository(Mission)
      private readonly missionsRepository: Repository<Mission>,
      @InjectRepository(Competence)
      private readonly competencesRepository: Repository<Competence>,
      @InjectRepository(Level)
      private readonly levelsRepository: Repository<Level>,
      @InjectRepository(User)
      private readonly usersRepository: Repository<User>,
    ) {}
  
    async createMission(
      createMissionRequest: CreateMissionRequest,
    ): Promise<any> {
      try {
        return await this.missionsRepository.save(createMissionRequest);
      } catch (err) {
        throw new InternalServerErrorException(err.driverError.message);
      }
    }
  
    async getMissions(): Promise<Mission[]> {
      const missions = await this.missionsRepository.find({
        relations: {
          competences: true,
        },
      });
      return missions;
    }
  
    async getMissionById(uuid: string): Promise<Mission> {
      const mission = await this.missionsRepository.findOneBy({ id: uuid });
      if (!mission) {
        throw new NotFoundException('Mission not found');
      }
  
      return mission;
    }

  
    async update(
      uuid: string,
      updateMissionRequest: UpdateMissionRequest,
    ): Promise<any> {
      try {
        if (updateMissionRequest.title) {
          throw new BadRequestException(
            'Password cannot be updated using this endpoint',
          );
        }
        const Mission = await this.missionsRepository.findOneBy({
          id: uuid,
        });
        if (!Mission) {
          throw new NotFoundException('Mission not found for update');
        }
        return await this.missionsRepository.update(
          uuid,
          updateMissionRequest,
        );
      } catch (err) {
        throw new BadRequestException(err.message);
      }
    }
  
    async delete(uuid: string): Promise<any> {
      const mission = await this.missionsRepository.findOneBy({ id: uuid });
      if (!mission) {
        throw new NotFoundException('Mission not found for deletion');
      }
  
      await this.missionsRepository.remove(mission);
    }
  
    public async seed() {

      const competence = await this.competencesRepository.findOneBy({
        competence: 'PHP',
      });
      const competence2 = await this.competencesRepository.findOneBy({
        competence: 'Bon vivant le man !',
      });
      const level = await this.levelsRepository.findOneBy({ level: 'Junior' });
      const user = await this.usersRepository.findOneBy({ email: 'user@user.com' });

      const missions1 = this.missionsRepository.create({
        title: 'Développeur Backend PHP',
        description: 'Développeur Backend PHP',
        points: 100,
        entreprise: 'SNCF',
        startMission: '2023-08-01',
        endMission: '2023-12-01',
        competences: [competence, competence2],
        level: level,
        user: user,
      });
      await this.missionsRepository.save(missions1);
  
      
      
      const missions2 = this.missionsRepository.create({
        title: 'Développeur Backend NodeJS',
        description: 'Développeur Backend NodeJS',
        points: 50,
        entreprise: 'Thalès',
        startMission: '2023-08-01',
        endMission: '2023-12-01',
        competences: [competence2],
        level: level,
      });
      await this.missionsRepository.save(missions2);



      const missions3 = this.missionsRepository.create({
        title: 'Développeur REACT',
        description: 'Développeur REACT',
        points: 20,
        entreprise: 'Thalès',
        startMission: '2023-08-01',
        endMission: '2023-12-01',
        competences: [],
        level: level,
      });
      await this.missionsRepository.save(missions3);
    }
  }
  