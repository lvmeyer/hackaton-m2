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
  import { Competence } from './Competence';
  import { CompetencesService } from './competences.service';
  import {
    CreateCompetenceRequest,
    UpdateCompetenceRequest
  } from './dto/competences.request';
  import {
    AuthenticationRequired,
    HasRole,
  } from '../authentication/authentication.decorator';
  import { Role } from '../authentication/authentication.enum';
  import { Request } from 'express';
  
  @Controller('competences')
  export class CompetencesController {
    constructor(private readonly competencesService: CompetencesService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createCompetence(
      @Body(ValidationPipe) createCompetenceRequest: CreateCompetenceRequest,
    ): Promise<Competence> {
      return await this.competencesService.createCompetence(createCompetenceRequest);
    }
  
    @AuthenticationRequired()
    @HasRole(Role.ADMINISTRATOR)
    @Get()
    @HttpCode(HttpStatus.OK)
    public getCompetences() {
      return this.competencesService.getCompetences();
    }
  
    @Get(':uuid')
    @AuthenticationRequired()
    @HttpCode(HttpStatus.OK)
    async findById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<Competence> {
      return this.competencesService.getCompetenceById(uuid);
    }
  
    @Patch(':uuid')
    @AuthenticationRequired()
    @HasRole(Role.ADMINISTRATOR)
    @HttpCode(HttpStatus.OK)
    async update(
      @Param('uuid', ParseUUIDPipe) uuid: string,
      @Body(ValidationPipe) updateCompetenceRequest: UpdateCompetenceRequest,
    ): Promise<any> {
      return await this.competencesService.update(uuid, updateCompetenceRequest);
    }
  
    @Delete(':uuid')
    @AuthenticationRequired()
    @HasRole(Role.ADMINISTRATOR)
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
      return await this.competencesService.delete(uuid);
    }
  }
  