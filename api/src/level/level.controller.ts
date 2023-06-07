import { Controller, Get, Post, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';
import { Level } from './Level';
import { LevelService } from './level.service';


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

}
