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
  } from '@nestjs/common';
  import { Mission } from './Mission';
  import { MissionsService } from './missions.service';
  import {
    CreateMissionRequest,
    UpdateMissionRequest,
  } from './dto/missions.request';
  import {
    AuthenticationRequired,
    HasRole,
  } from '../authentication/authentication.decorator';
  import { Role } from '../authentication/authentication.enum';
  import { Request } from 'express';
  
  @Controller('missions')
  export class MissionsController {
    constructor(private readonly missionsService: MissionsService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createMission(
      @Body(ValidationPipe) createMissionRequest: CreateMissionRequest,
    ): Promise<Mission> {
      createMissionRequest.startMission = new Date(
        createMissionRequest.startMission,
      );
      createMissionRequest.endMission = new Date(
        createMissionRequest.endMission,
      );
      return await this.missionsService.createMission(
        createMissionRequest,
      );
    }
  
    @AuthenticationRequired()
    @HasRole(Role.ADMINISTRATOR)
    @Get()
    @HttpCode(HttpStatus.OK)
    public getMissions() {
      return this.missionsService.getMissions();
    }
  
    @Get(':uuid')
    @AuthenticationRequired()
    @HttpCode(HttpStatus.OK)
    async findById(
      @Param('uuid', ParseUUIDPipe) uuid: string,
    ): Promise<Mission> {
      return this.missionsService.getMissionById(uuid);
    }
  
    @Patch(':uuid')
    @AuthenticationRequired()
    @HasRole(Role.ADMINISTRATOR)
    @HttpCode(HttpStatus.OK)
    async update(
      @Param('uuid', ParseUUIDPipe) uuid: string,
      @Body(ValidationPipe) updateMissionRequest: UpdateMissionRequest,
    ): Promise<any> {
      return await this.missionsService.update(uuid, updateMissionRequest);
    }
  
    @Delete(':uuid')
    @AuthenticationRequired()
    @HasRole(Role.ADMINISTRATOR)
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
      return await this.missionsService.delete(uuid);
    }
  }
  