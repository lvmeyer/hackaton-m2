import {
  Body,
  Controller,
  Get,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Sites } from './Sites';
import { SitesService } from './sites.service';
import { CreateSiteRequest } from './dto/sites.request';
import {
  AuthenticationRequired,
  HasRole,
} from '../../authentication/authentication.decorator';
import { Role } from '../../authentication/authentication.enum';

@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSite(
    @Body(ValidationPipe) createSiteRequest: CreateSiteRequest,
  ): Promise<Sites> {
    return await this.sitesService.createSite(createSiteRequest);
  }

  @Get(':uuid')
  @AuthenticationRequired()
  @HttpCode(HttpStatus.OK)
  async findById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<Sites> {
    return this.sitesService.getSiteById(uuid);
  }

  @Delete(':uuid')
  @AuthenticationRequired()
  @HasRole(Role.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    return await this.sitesService.delete(uuid);
  }
}
