import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Level } from 'src/level/Level';
import { Repository } from 'typeorm';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private levelRepository: Repository<Level>,
  ) {}
  findAll(): Promise<Level[]> {
    return this.levelRepository.find();
  }
  async getLevelById(uuid: string): Promise<Level> {
    const user = await this.levelRepository.findOneBy({ id: uuid });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
