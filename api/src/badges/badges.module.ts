import { Module } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { BadgesController } from './badges.controller';
import { Badges } from './Badges';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/User';
import { UsersService } from '../users/users.service';
import { CompetencesService } from '../competences/competences.service';
import { Competence } from '../competences/Competence';
import { MissionsService } from '../missions/missions.service';
import { Mission } from '../missions/Mission';
import { LevelsService } from '../level/level.service';
import { Level } from '../level/Level';
import { UserCompetences } from '../user-competences/UserCompetences';


@Module({
  imports: [TypeOrmModule.forFeature([Badges, User, Competence, Mission, Level, UserCompetences])],
  providers: [BadgesService, UsersService, CompetencesService, MissionsService, LevelsService],
  controllers: [BadgesController],
  exports: [BadgesService],
})
export class BadgesModule {}
