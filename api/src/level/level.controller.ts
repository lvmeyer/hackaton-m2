import { Controller, Get, Post } from '@nestjs/common';
import { LevelService } from './level.service.js';

@Controller('level')
export class LevelController {
  constructor(private readonly levelsService: LevelService) {}

  @Get()
  getLevels() {
    return this.levelsService.getLevels();
  }

  @Post()
  createLevel() {
    return this.levelsService.createLevel();
  }
}
