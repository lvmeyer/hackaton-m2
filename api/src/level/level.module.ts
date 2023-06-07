import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { Level } from './Level.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Level])],
  providers: [LevelService],
  controllers: [LevelController],
  exports: [LevelService],
})
export class LevelModule {}
