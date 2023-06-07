import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Level } from './Level.js';
import { Repository } from 'typeorm';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) {}

  public getLevels(): Promise<Level[]> {
    return this.levelRepository.find();
  }

  public createLevel(): Promise<Level> {
    return this.levelRepository.save({ level: 'Level 2' });
  }
}
