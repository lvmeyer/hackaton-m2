import { Module } from '@nestjs/common';
import { LevelsService } from './level.service';
import { LevelController } from './level.controller';
import { Level } from './Level';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/User';
import { UsersService } from '../users/users.service';
import { CompetencesService } from '../competences/competences.service';
import { Competence } from '../competences/Competence';

@Module({
  imports: [TypeOrmModule.forFeature([Level, User, Competence])],
  providers: [LevelsService, UsersService, CompetencesService],
  controllers: [LevelController],
  exports: [LevelsService],
})
export class LevelsModule {}
