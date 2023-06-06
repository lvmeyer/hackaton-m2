import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User';
import { CompetencesService } from 'src/competences/competences.service';
import { Competence } from 'src/competences/Competence';

@Module({
  imports: [TypeOrmModule.forFeature([User, Competence])],
  controllers: [UsersController],
  providers: [UsersService, CompetencesService],
  exports: [UsersService],
})
export class UsersModule {}
