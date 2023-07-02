import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Sites } from './Sites';
import { SitesController } from './sites.controller';
import { SitesService } from './sites.service';

import { UsersService } from '../../users/users.service';
import { User } from '../../users/User';

import { Mission } from '../../missions/Mission';
import { MissionsService } from '../../missions/missions.service';

import { CompetencesService } from '../../competences/competences.service';
import { Competence } from '../../competences/Competence';

import { UserCompetencesService } from '../../user-competences/user-competences.service';
import { UserCompetences } from '../../user-competences/UserCompetences';

import { Badges } from '../../badges/Badges';
import { BadgesService } from '../../badges/badges.service';

import { Level } from '../../level/Level';
import { LevelsService } from '../../level/level.service';


@Module({
  imports: [TypeOrmModule.forFeature([Sites, User, Mission, Competence, UserCompetences, Badges, Level])],
  controllers: [SitesController],
  providers: [SitesService, UsersService, MissionsService, CompetencesService, UserCompetencesService, BadgesService, LevelsService],
  exports: [SitesService],
})
export class SitesModule {}
