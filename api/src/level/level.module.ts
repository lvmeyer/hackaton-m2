import { Module } from '@nestjs/common';
import { LevelsService } from './level.service';
import { LevelController } from './level.controller';
import { Level } from './Level';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/User';
import { UsersService } from '../users/users.service';
import { CompetencesService } from '../competences/competences.service';
import { Competence } from '../competences/Competence';
import { MissionsService } from '../missions/missions.service';
import { Mission } from '../missions/Mission';
import { Badges } from '../badges/Badges';
import { BadgesService } from '../badges/badges.service';
import { UserCompetences } from '../user-competences/UserCompetences';
import { FormationsService } from '../formations/formations.service';
import { Formations } from '../formations/Formations';
import { UserCompetencesService } from '../user-competences/user-competences.service';

@Module({
  imports: [TypeOrmModule.forFeature([Level, User, Competence, Mission, Badges, UserCompetences, Formations])],
  providers: [LevelsService, UsersService, CompetencesService, MissionsService, BadgesService, FormationsService, UserCompetencesService],
  controllers: [LevelController],
  exports: [LevelsService],
})
export class LevelsModule {}
