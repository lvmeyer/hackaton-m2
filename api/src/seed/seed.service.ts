import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CompetencesService } from '../competences/competences.service';
import { MissionsService } from '../missions/missions.service';

@Injectable()
export class SeedService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly competencesService: CompetencesService,
    private readonly missionsService: MissionsService,
  ) {}

  public async seed() { 
    await this.competencesService.seed();
    await this.missionsService.seed();
    await this.usersService.seed();
  }
}
