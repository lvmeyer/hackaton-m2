import { Module } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { Mission } from './Mission';
import { User } from '../users/User';
import { Competence } from '../competences/Competence';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionsController } from './missions.controller';
import { CompetencesService } from '../competences/competences.service';
import { UsersService } from '../users/users.service';
import { LevelsService } from '../level/level.service';
import { Level } from '../level/Level';
import { BadgesService } from '../badges/badges.service';
import { Badges } from '../badges/Badges';

@Module({
  imports: [TypeOrmModule.forFeature([Mission, Competence, User, Level, Badges])],
  controllers: [MissionsController],
  providers: [MissionsService, CompetencesService, UsersService, LevelsService, BadgesService],
  exports: [MissionsService],
})
export class MissionsModule {}
