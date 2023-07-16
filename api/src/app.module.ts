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
import { BadgesModule } from './badges/badges.module';
import { FormationsModule } from './formations/formations.module';

import { UserCompetencesModule } from './user-competences/user-competences.module';
import { UserCompetences } from './user-competences/UserCompetences';
import { SitesModule } from './WebAnalytics/sites/sites.module';
import { TagsModule } from './tags/tags.module';
import { TunnelsModule } from './tunnels/tunnels.module';

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
    TypeOrmModule.forFeature([User, Competence, UserCompetences]),
    UsersModule,
    CompetencesModule,
    MissionsModule,
    AuthenticationModule,
    LevelsModule,
    BadgesModule,
    FormationsModule,
    UserCompetencesModule,
    SitesModule,
    TagsModule,
    TunnelsModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, SeedService],
  exports: [SeedService],
})
export class AppModule {}
