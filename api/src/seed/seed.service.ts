import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CompetencesService } from '../competences/competences.service';
import { MissionsService } from '../missions/missions.service';
import { LevelsService } from '../level/level.service';
import { BadgesService } from '../badges/badges.service';
import { FormationsService } from '../formations/formations.service';
import { SitesService } from '../WebAnalytics/sites/sites.service';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class SeedService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly competencesService: CompetencesService,
    private readonly missionsService: MissionsService,
    private readonly levelsService: LevelsService,
    private readonly badgesService: BadgesService,
    private readonly formationsService: FormationsService,
    private readonly sitesService: SitesService,
    private readonly tagsService: TagsService,
  ) {}

  public async seed() {
    await this.competencesService.seed();
    await this.usersService.seed();
    await this.badgesService.seed();
    await this.formationsService.seed();
    await this.levelsService.seed();
    await this.missionsService.seed();
    await this.sitesService.seed();
    await this.tagsService.seed();
  }
}
