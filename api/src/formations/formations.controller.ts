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
  Query,
} from '@nestjs/common';
import { FormationsService } from './formations.service';
import {
  AuthenticationRequired,
  HasRole,
} from '../authentication/authentication.decorator';
import { Role } from '../authentication/authentication.enum';

import { Formations } from './Formations';
import {
  CreateFormationRequest,
  UpdateFormationRequest,
} from './dto/formations.request';

@Controller('formations')
export class FormationsController {
  constructor(private readonly formationsService: FormationsService) {}

  @AuthenticationRequired()
  @Get('user')
  @HttpCode(HttpStatus.OK)
  async getUserFormation(@Query() query: string) {
    return this.formationsService.getUserFormation({ query: query });
  }

  @AuthenticationRequired()
  @Get('user/accomplished')
  @HttpCode(HttpStatus.OK)
  async getUserFormationAccomplished(@Query() query: string) {
    return this.formationsService.getUserFormationAccomplished({
      query: query,
    });
  }

  @AuthenticationRequired()
  @Get()
  @HttpCode(HttpStatus.OK)
  public getFormations() {
    return this.formationsService.getFormations();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createFormation(
    @Body(ValidationPipe) createFormationRequest: CreateFormationRequest,
  ): Promise<Formations> {
    return await this.formationsService.createFormation(createFormationRequest);
  }

  @Get(':uuid')
  @AuthenticationRequired()
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<Formations> {
    return this.formationsService.getFormationById(uuid);
  }

  @Patch(':uuid')
  @AuthenticationRequired()
  @HasRole(Role.ADMINISTRATOR)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) updateFormationRequest: UpdateFormationRequest,
  ): Promise<any> {
    return await this.formationsService.update(uuid, updateFormationRequest);
  }

  @Delete(':uuid')
  @AuthenticationRequired()
  @HasRole(Role.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    return await this.formationsService.delete(uuid);
  }
}
