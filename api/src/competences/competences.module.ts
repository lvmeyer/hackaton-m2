import { Module } from '@nestjs/common';
import { CompetencesService } from './competences.service';
import { CompetencesController } from './competences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competence } from './Competence';
import { User } from '../users/User';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Competence, User])],
  controllers: [CompetencesController],
  providers: [CompetencesService, UsersService],
  exports: [CompetencesService],
})
export class CompetencesModule {}
