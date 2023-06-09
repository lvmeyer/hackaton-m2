import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Formations } from './Formations';
  import { Repository } from 'typeorm';
  import { User } from '../users/User';
  import {
    CreateFormationRequest,
    UpdateFormationRequest,
  } from './dto/formations.request';
  
  @Injectable()
  export class FormationsService {
    constructor(
      @InjectRepository(Formations)
      private readonly formationsRepository: Repository<Formations>,
      @InjectRepository(User)
      private readonly usersRepository: Repository<User>,
    ) {}
  
    async createFormation(createFormationRequest: CreateFormationRequest): Promise<any> {
      try {
        return await this.formationsRepository.save(createFormationRequest);
      } catch (err) {
        throw new InternalServerErrorException(err.driverError.message);
      }
    }
  
    public getFormations(): Promise<Formations[]> {
      return this.formationsRepository.find({
        relations: {
          users: true
        }
      });
    }
  
    async getFormationById(uuid: string): Promise<Formations> {
      const formations = await this.formationsRepository.findOneBy({ id: uuid });
      if (!formations) {
        throw new NotFoundException('formations not found');
      }
  
      return formations;
    }
  
    async update(
      uuid: string,
      updateFormationRequest: UpdateFormationRequest,
    ): Promise<any> {
      try {
        if (updateFormationRequest.title) {
          throw new BadRequestException(
            'Formation cannot be updated using this endpoint',
          );
        }
        const formations = await this.formationsRepository.findOneBy({ id: uuid });
        if (!formations) {
          throw new NotFoundException('Formation not found for update');
        }
        return await this.formationsRepository.update(uuid, updateFormationRequest);
      } catch (err) {
        throw new BadRequestException(err.message);
      }
    }
  
    async delete(uuid: string): Promise<any> {
      const formations = await this.formationsRepository.findOneBy({ id: uuid });
      if (!formations) {
        throw new NotFoundException('Formation not found for deletion');
      }
  
      await this.formationsRepository.remove(formations);
    }
      
      public async seed() {
        await this.formationsRepository.delete({});
        
        const formation = this.formationsRepository.create({
          title: 'Expert JAVA',
          former: 'jean',
        });
        const formationJAVA = await this.formationsRepository.save(formation);
        


        const user = this.usersRepository.create({
        email: 'user1@user.com',
        password: 'user1',
        firstname: 'jean',
        lastname: 'jaeaje',
        formations: [formationJAVA]
      })
      await this.usersRepository.save(user)

    }
  }
  