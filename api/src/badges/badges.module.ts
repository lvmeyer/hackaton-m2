import { Module } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { BadgesController } from './badges.controller';
import { Badges } from './Badges';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/User';
import { UsersService } from '../users/users.service';
import { CompetencesService } from '../competences/competences.service';
import { Competence } from '../competences/Competence';


@Module({
  imports: [TypeOrmModule.forFeature([Badges, User, Competence])],
  providers: [BadgesService, UsersService, CompetencesService],
  controllers: [BadgesController],
  exports: [BadgesService],
})
export class BadgesModule {}
