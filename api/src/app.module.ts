import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmCustomModule } from './typeorm/typeorm.module';

import { UsersModule } from './users/users.module';
import { User } from './users/User';

import { CompetencesModule } from './competences/competences.module';
import { Competence } from './competences/Competence';

import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { SeedService } from './seed/seed.service';
import { LevelsModule } from './level/level.module';
import { MissionsModule } from './missions/missions.module';
import { BadgesController } from './badges/badges.controller';
import { BadgesModule } from './badges/badges.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
      }),
      envFilePath: './.env',
    }),
    TypeOrmCustomModule.register(),
    TypeOrmModule.forFeature([User, Competence]),
    UsersModule,
    CompetencesModule,
    MissionsModule,
    AuthenticationModule,
    LevelsModule,
    BadgesModule
  ],
  controllers: [AuthenticationController, BadgesController],
  providers: [AuthenticationService, SeedService],
  exports: [SeedService],
})
export class AppModule {}
