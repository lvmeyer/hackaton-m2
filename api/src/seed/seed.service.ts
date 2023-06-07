import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CompetencesService } from '../competences/competences.service';

@Injectable()
export class SeedService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly competencesService: CompetencesService,
  ) {}

  public async seed() { 
    await this.competencesService.seed();
    await this.usersService.seed();
  }
}
