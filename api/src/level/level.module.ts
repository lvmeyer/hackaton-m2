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

@Module({
  imports: [TypeOrmModule.forFeature([Level, User, Competence, Mission])],
  providers: [LevelsService, UsersService, CompetencesService, MissionsService],
  controllers: [LevelController],
  exports: [LevelsService],
})
export class LevelsModule {}
