import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sites } from './Sites';
import { Repository } from 'typeorm';
import {
  CreateSiteRequest,
} from './dto/sites.request';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Sites)
    private readonly SitesRepository: Repository<Sites>,
  ) {}


  async getSiteById(uuid: string): Promise<Sites> {
    const Site = await this.SitesRepository.findOneBy({ id: uuid });
    if (!Site) {
      throw new NotFoundException('Site not found');
    }

    return Site;
  }


  async createSite(
    createSiteRequest: CreateSiteRequest,
  ): Promise<any> {
    try {
      return await this.SitesRepository.save(createSiteRequest);
    } catch (err) {
      throw new InternalServerErrorException(err.driverError.message);
    }
  }

  async delete(uuid: string): Promise<any> {
    const Site = await this.SitesRepository.findOneBy({ id: uuid });
    if (!Site) {
      throw new NotFoundException('Site not found for deletion');
    }

    await this.SitesRepository.remove(Site);
  }

  public async seed() {
    await this.SitesRepository.delete({});
  }

}
