import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TunnelsController } from './tunnels.controller';
import { TunnelsService } from './tunnels.service';
import { Tunnel } from './Tunnel';
import { TagsController } from '../tags/tags.controller';
import { TagsService } from '../tags/tags.service';
import { Tag } from '../tags/Tag';

import { Sites } from '../WebAnalytics/sites/Sites';
import { SitesService } from '../WebAnalytics/sites/sites.service';

import { UsersService } from '../users/users.service';
import { User } from '../users/User';

import { Mission } from '../missions/Mission';
import { MissionsService } from '../missions/missions.service';

import { CompetencesService } from '../competences/competences.service';
import { Competence } from '../competences/Competence';

import { UserCompetencesService } from '../user-competences/user-competences.service';
import { UserCompetences } from '../user-competences/UserCompetences';

import { Badges } from '../badges/Badges';
import { BadgesService } from '../badges/badges.service';

import { Level } from '../level/Level';
import { LevelsService } from '../level/level.service';


@Module({
    imports: [TypeOrmModule.forFeature([Sites, User, Mission, Competence, UserCompetences, Badges, Level, Tag, Tunnel])],
    controllers: [TunnelsController],
    providers: [TagsService, SitesService, UsersService, MissionsService, CompetencesService, UserCompetencesService, BadgesService, LevelsService, TunnelsService],
    exports: [TunnelsService],
})
export class TunnelsModule {}