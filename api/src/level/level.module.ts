import { Module } from '@nestjs/common';
import { LevelsService } from './level.service';
import { LevelController } from './level.controller';
import { Level } from './Level';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/User';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Level, User])],
  providers: [LevelsService, UsersService],
  controllers: [LevelController],
  exports: [LevelsService],
})
export class LevelModule {}
