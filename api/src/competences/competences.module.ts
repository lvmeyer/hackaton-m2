import { Module } from '@nestjs/common';
import { CompetencesService } from './competences.service';
import { CompetencesController } from './competences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competence } from './Competence';
import { User } from '../users/User';
import { UsersService } from '../users/users.service';
import { Mission } from '../missions/Mission';
import { MissionsService } from '../missions/missions.service';
import { Level } from '../level/Level';
import { LevelsService } from '../level/level.service';
import { BadgesService } from '../badges/badges.service';
import { Badges } from '../badges/Badges';
import { UserCompetences } from '../user-competences/UserCompetences';
import { FormationsService } from '../formations/formations.service';
import { Formations } from '../formations/Formations';

@Module({
  imports: [TypeOrmModule.forFeature([Competence, User, Mission, Level, Badges, UserCompetences, Formations])],
  controllers: [CompetencesController],
  providers: [CompetencesService, UsersService, MissionsService, LevelsService, BadgesService, FormationsService],
  exports: [CompetencesService],
})
export class CompetencesModule {}
