import { Module } from '@nestjs/common';
import { CompetencesService } from './competences.service';
import { CompetencesController } from './competences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competence } from './Competence';

@Module({
  imports: [TypeOrmModule.forFeature([Competence])],
  controllers: [CompetencesController],
  providers: [CompetencesService],
  exports: [CompetencesService],
})
export class CompetencesModule {}
