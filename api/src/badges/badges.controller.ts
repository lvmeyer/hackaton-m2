import {
  Body,
  Controller,
  Get,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  ValidationPipe,
  Req,
  BadRequestException,
  Headers,
} from '@nestjs/common';
import { BadgesService } from './badges.service';
import {
  AuthenticationRequired,
  HasRole,
} from '../authentication/authentication.decorator';
import { Role } from '../authentication/authentication.enum';

import { Badges } from './Badges';
import { CreateBadgeRequest, UpdateBadgeRequest } from './dto/badges.request';

@Controller('badges')
export class BadgesController {
  constructor(private readonly badgesService: BadgesService) {}

  @AuthenticationRequired()
  @HasRole(Role.ADMINISTRATOR)
  @Get()
  @HttpCode(HttpStatus.OK)
  public getBadges() {
    return this.badgesService.getBadges();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBadge(
    @Body(ValidationPipe) createBadgeRequest: CreateBadgeRequest,
  ): Promise<Badges> {
    return await this.badgesService.createBadge(createBadgeRequest);
  }

  @Get(':uuid')
  @AuthenticationRequired()
  @HttpCode(HttpStatus.OK)
  async findById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<Badges> {
    return this.badgesService.getBadgeById(uuid);
  }

  @Patch(':uuid')
  @AuthenticationRequired()
  @HasRole(Role.ADMINISTRATOR)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) updateBadgeRequest: UpdateBadgeRequest,
  ): Promise<any> {
    return await this.badgesService.update(uuid, updateBadgeRequest);
  }

  @Delete(':uuid')
  @AuthenticationRequired()
  @HasRole(Role.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    return await this.badgesService.delete(uuid);
  }
}
