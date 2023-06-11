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
import { User } from '../users/User';
import { hash } from 'bcryptjs';
  
  @Injectable()
  export class BadgesService {
    constructor(
      @InjectRepository(Badges)
      private readonly badgesRepository: Repository<Badges>,
      @InjectRepository(User)
      private readonly usersRepository: Repository<User>,
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

    async getBadgesWithUsers(): Promise<Badges[]> {
      return this.badgesRepository
        .createQueryBuilder('badge')
        .leftJoinAndSelect('badge.users', 'user')
        .getMany();
    }
  
    
    public async seed() {
      const userPassword = await hash('password', 10);
      await this.badgesRepository.delete({});
      
      // const user1 = await this.usersRepository.findOneBy({
      //   email: 'user@user.com',
      // })

      const badgeJuniorNest = this.badgesRepository.create({
        badge: 'Junior Nest',
        nb_point: 20,
      });
      await this.badgesRepository.save(badgeJuniorNest);

      const badgeIntermediaireNest = this.badgesRepository.create({
        badge: 'Intermediaire Nest',
        nb_point: 30,
      });
      await this.badgesRepository.save(badgeIntermediaireNest);

      const badgeExpertJs = this.badgesRepository.create({
        badge: 'Intermediaire JS',
        nb_point: 30,
      });
      const InteJs = await this.badgesRepository.save(badgeExpertJs);

      const badgeExpertNest = this.badgesRepository.create({
        badge: 'Expert Nest',
        nb_point: 100,
      });
      const expertNest = await this.badgesRepository.save(badgeExpertNest);

      const badgeSeniortNest = this.badgesRepository.create({
        badge: 'Senior Nest',
        nb_point: 300,
      });
      const seniorNest = await this.badgesRepository.save(badgeSeniortNest);


      const user = this.usersRepository.create({
        email: 'user3@user3.com',
        firstname: 'Victor',
        lastname: 'Valée',
        password: userPassword,
        badges: [seniorNest, InteJs]
      });
      await this.usersRepository.save(user);
          }
  }
  