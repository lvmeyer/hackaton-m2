import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Level } from './Level';
import { Repository } from 'typeorm';
import {
  CreateLevelRequest,
  UpdateLevelRequest,
} from './dto/levels.request';
import { hash } from 'bcryptjs';
import { Role } from '../authentication/authentication.enum';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(Level)
    private readonly levelsRepository: Repository<Level>,
  ) {}

  async createLevel(createLevelRequest: CreateLevelRequest): Promise<any> {
    try {
      return await this.levelsRepository.save(createLevelRequest);
    } catch (err) {
      throw new InternalServerErrorException(err.driverError.message);
    }
  }

  public getLevels(): Promise<Level[]> {
    return this.levelsRepository.find();
  }

  async getLevelById(uuid: string): Promise<Level> {
    const level = await this.levelsRepository.findOneBy({ id: uuid });
    if (!level) {
      throw new NotFoundException('Level not found');
    }

    return level;
  }

  async update(
    uuid: string,
    updateLevelRequest: UpdateLevelRequest,
  ): Promise<any> {
    try {
      if (updateLevelRequest.level) {
        throw new BadRequestException(
          'Level cannot be updated using this endpoint',
        );
      }
      const level = await this.levelsRepository.findOneBy({ id: uuid });
      if (!level) {
        throw new NotFoundException('Level not found for update');
      }
      return await this.levelsRepository.update(uuid, updateLevelRequest);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async delete(uuid: string): Promise<any> {
    const level = await this.levelsRepository.findOneBy({ id: uuid });
    if (!level) {
      throw new NotFoundException('Level not found for deletion');
    }

    await this.levelsRepository.remove(level);
  }

  public async seed() {
    await this.levelsRepository.delete({});

    await this.levelsRepository.insert({
      level: 'Junior',
    });
    await this.levelsRepository.insert({
      level: 'Intermédiaire',
    });
    await this.levelsRepository.insert({
      level: 'Expert',
    });
    return this.levelsRepository.insert({
      level: 'Senior',
    });
  }
}
