import { Controller, Get, Post, HttpCode, HttpStatus, Param, ParseUUIDPipe, Body, ValidationPipe,  } from '@nestjs/common';
import { Level } from './Level';
import { LevelService } from './level.service';
// import {createLevelDto} from './dto/create-level.dto';


@Controller('level')
export class LevelController {

    constructor(private readonly levelService: LevelService) {}

    @Get()
    getLevel(): Promise<Level[]> {
        return this.levelService.findAll();
    }

    @Get(':uuid')
    // @AuthenticationRequired()
    @HttpCode(HttpStatus.OK)
    async findById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<Level> {
        return this.levelService.getLevelById(uuid);
    }

    // @Post()
    // @HttpCode(HttpStatus.CREATED)
    // async createLevel(
    //     @Body(ValidationPipe) createUserRequest: CreateLevelRequest,
    // ): Promise<Level> {
    //     return await this.levelService.createLevel(createUserRequest);
    // }

    // @Post()
    // create(@Body() createLevelDto: CreateLevelDto) {
    //     return this.levelService.create(createLevelDto);
    // }

}
