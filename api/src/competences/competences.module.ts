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

@Module({
  imports: [TypeOrmModule.forFeature([Competence, User, Mission, Level])],
  controllers: [CompetencesController],
  providers: [CompetencesService, UsersService, MissionsService, LevelsService],
  exports: [CompetencesService],
})
export class CompetencesModule {}
