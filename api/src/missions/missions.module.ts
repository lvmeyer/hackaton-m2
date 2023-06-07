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

@Module({
  imports: [TypeOrmModule.forFeature([Mission, Competence, User, Level])],
  controllers: [MissionsController],
  providers: [MissionsService, CompetencesService, UsersService, LevelsService],
  exports: [MissionsService],
})
export class MissionsModule {}
