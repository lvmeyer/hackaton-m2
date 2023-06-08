import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Badges } from './Badges';
  import { Repository } from 'typeorm';
  import {
    CreateBadgeRequest,
    UpdateBadgeRequest,
  } from './dto/badges.request';
  
  @Injectable()
  export class BadgesService {
    constructor(
      @InjectRepository(Badges)
      private readonly badgesRepository: Repository<Badges>,
    ) {}
  
    async createBadge(createBadgeRequest: CreateBadgeRequest): Promise<any> {
      try {
        return await this.badgesRepository.save(createBadgeRequest);
      } catch (err) {
        throw new InternalServerErrorException(err.driverError.message);
      }
    }
  
    public getBadges(): Promise<Badges[]> {
      return this.badgesRepository.find();
    }
  
    async getBadgeById(uuid: string): Promise<Badges> {
      const badges = await this.badgesRepository.findOneBy({ id: uuid });
      if (!badges) {
        throw new NotFoundException('Badge not found');
      }
  
      return badges;
    }
  
    async update(
      uuid: string,
      updateBadgeRequest: UpdateBadgeRequest,
    ): Promise<any> {
      try {
        if (updateBadgeRequest.badge) {
          throw new BadRequestException(
            'Badge cannot be updated using this endpoint',
          );
        }
        const badges = await this.badgesRepository.findOneBy({ id: uuid });
        if (!badges) {
          throw new NotFoundException('Badge not found for update');
        }
        return await this.badgesRepository.update(uuid, updateBadgeRequest);
      } catch (err) {
        throw new BadRequestException(err.message);
      }
    }
  
    async delete(uuid: string): Promise<any> {
      const badges = await this.badgesRepository.findOneBy({ id: uuid });
      if (!badges) {
        throw new NotFoundException('Badge not found for deletion');
      }
  
      await this.badgesRepository.remove(badges);
    }
  
    // public async seed() {
    //   await this.badgesRepository.delete({});
  
    //   await this.badgesRepository.insert({
    //     badge: 'Junior php',
    //     nb_point: 10,
    //   });
    //   await this.badgesRepository.insert({
    //     badge: 'Intermédiaire php',
    //     nb_point: 30,
    //   });
    //   await this.badgesRepository.insert({
    //     badge: 'Expert php',
    //     nb_point: 100,
    //   });
    //   return this.badgesRepository.insert({
    //     badge: 'Senior php',
    //     nb_point: 300,
    //   });
    // }
  }
  