import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmCustomModule } from './typeorm/typeorm.module.js';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { User } from './user/User.js';

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
    TypeOrmModule.forFeature([User]),
    UserModule,
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
