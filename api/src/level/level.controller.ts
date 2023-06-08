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
  Headers, } from '@nestjs/common';
import { LevelsService } from './level.service';
import {
  AuthenticationRequired,
  HasRole,
} from '../authentication/authentication.decorator';
import { Role } from '../authentication/authentication.enum';
import {
  CreateLevelRequest,
  UpdateLevelRequest
} from './dto/levels.request';
import { Level } from './Level';


@Controller('level')
export class LevelController {
  constructor(private readonly levelsService: LevelsService) {}


  @AuthenticationRequired()
  @HasRole(Role.ADMINISTRATOR)
  @Get()
  @HttpCode(HttpStatus.OK)
  public getLevels() {
    return this.levelsService.getLevels();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createLevel(
    @Body(ValidationPipe) createLevelRequest: CreateLevelRequest,
  ): Promise<Level> {
    return await this.levelsService.createLevel(createLevelRequest);
  }

  @Get(':uuid')
  @AuthenticationRequired()
  @HttpCode(HttpStatus.OK)
  async findById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<Level> {
    return this.levelsService.getLevelById(uuid);
  }

  @Patch(':uuid')
  @AuthenticationRequired()
  @HasRole(Role.ADMINISTRATOR)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) updateLevelRequest: UpdateLevelRequest,
  ): Promise<any> {
    return await this.levelsService.update(uuid, updateLevelRequest);
  }

  @Delete(':uuid')
  @AuthenticationRequired()
  @HasRole(Role.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    return await this.levelsService.delete(uuid);
  }


  



}
