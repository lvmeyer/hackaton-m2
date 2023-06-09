import { Module } from '@nestjs/common';
import { BadgesService } from '../badges/badges.service';
import { Badges } from '../badges/Badges';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/User';
import { UsersService } from '../users/users.service';
import { CompetencesService } from '../competences/competences.service';
import { Competence } from '../competences/Competence';
import { MissionsService } from '../missions/missions.service';
import { Mission } from '../missions/Mission';
import { LevelsService } from '../level/level.service';
import { Level } from '../level/Level';

import { FormationsController } from './formations.controller';
import { FormationsService } from './formations.service';
import { Formations } from './Formations';

@Module({
  imports: [TypeOrmModule.forFeature([Formations, Badges, User, Competence, Mission, Level])],
  providers: [FormationsService, BadgesService, UsersService, CompetencesService, MissionsService, LevelsService],
  controllers: [FormationsController],
  exports: [FormationsService],
})
export class FormationsModule {}
