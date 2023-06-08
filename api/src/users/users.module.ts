import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User';
import { CompetencesService } from '../competences/competences.service';
import { Competence } from '../competences/Competence';
import { MissionsService } from '../missions/missions.service';
import { Mission } from '../missions/Mission';
import { Level } from '../level/Level';
import { LevelsService } from '../level/level.service';
import { BadgesService } from '../badges/badges.service';
import { Badges } from '../badges/Badges';

@Module({
  imports: [TypeOrmModule.forFeature([User, Competence, Mission, Level, Badges])],
  controllers: [UsersController],
  providers: [UsersService, CompetencesService, MissionsService, LevelsService, BadgesService],
  exports: [UsersService],
})
export class UsersModule {}
