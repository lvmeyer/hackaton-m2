import { Module } from '@nestjs/common';
import { CompetencesService } from '../competences/competences.service';
import { CompetencesController } from '../competences/competences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competence } from '../competences/Competence';
import { User } from '../users/User';
import { UsersService } from '../users/users.service';
import { Mission } from '../missions/Mission';
import { MissionsService } from '../missions/missions.service';
import { Level } from '../level/Level';
import { LevelsService } from '../level/level.service';
import { BadgesService } from '../badges/badges.service';
import { Badges } from '../badges/Badges';
import { UserCompetencesService } from './user-competences.service';
import { UserCompetencesController } from './user-competences.controller';
import { UserCompetences } from './UserCompetences';
import { FormationsService } from '../formations/formations.service';
import { Formations } from '../formations/Formations';

@Module({
  imports: [TypeOrmModule.forFeature([UserCompetences, Competence, User, Mission, Level, Badges, Formations])],
  controllers: [CompetencesController, UserCompetencesController],
  providers: [CompetencesService, UsersService, MissionsService, LevelsService, BadgesService, FormationsService],
  exports: [CompetencesService],
})
export class UserCompetencesModule {}