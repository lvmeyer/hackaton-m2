import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Competence } from './Competence';
import { Repository } from 'typeorm';
import {
  CreateCompetenceRequest,
  UpdateCompetenceRequest,
} from './dto/competences.request';

@Injectable()
export class CompetencesService {
  constructor(
    @InjectRepository(Competence)
    private readonly competencesRepository: Repository<Competence>,
  ) {}

  async createCompetence(
    createCompetenceRequest: CreateCompetenceRequest,
  ): Promise<any> {
    try {
      return await this.competencesRepository.save(createCompetenceRequest);
    } catch (err) {
      throw new InternalServerErrorException(err.driverError.message);
    }
  }

  public getCompetences(): Promise<Competence[]> {
    return this.competencesRepository.find();
  }

  async getCompetenceById(uuid: string): Promise<Competence> {
    const competence = await this.competencesRepository.findOneBy({ id: uuid });
    if (!competence) {
      throw new NotFoundException('Competence not found');
    }

    return competence;
  }

  async update(
    uuid: string,
    updateCompetenceRequest: UpdateCompetenceRequest,
  ): Promise<any> {
    try {
      if (updateCompetenceRequest.password) {
        throw new BadRequestException(
          'Password cannot be updated using this endpoint',
        );
      }
      const competence = await this.competencesRepository.findOneBy({
        id: uuid,
      });
      if (!competence) {
        throw new NotFoundException('Competence not found for update');
      }
      return await this.competencesRepository.update(
        uuid,
        updateCompetenceRequest,
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async delete(uuid: string): Promise<any> {
    const competence = await this.competencesRepository.findOneBy({ id: uuid });
    if (!competence) {
      throw new NotFoundException('Competence not found for deletion');
    }

    await this.competencesRepository.remove(competence);
  }

  public async seed() {
    await this.competencesRepository.delete({});

    await this.competencesRepository.insert({
      competence: 'Java',
      type: true
    });

    await this.competencesRepository.insert({
      competence: '.NET',
      type: true
    });
    
    await this.competencesRepository.insert({
      competence: 'Node.js',
      type: true
    });
    
    await this.competencesRepository.insert({
      competence: 'Angular',
      type: true
    });
    
    await this.competencesRepository.insert({
      competence: 'React.js',
      type: true
    });
    
    await this.competencesRepository.insert({
      competence: 'Vue.js',
      type: true
    });

    return this.competencesRepository.insert({
      competence: 'Bon vivant le man !',
      type: false
    });
  }
}
