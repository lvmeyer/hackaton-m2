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
import { TagsService } from './tags.service';
import { CreateTagDto, UpdateTagDto } from './dto/tags.request';
import {
  AuthenticationRequired,
  HasRole,
} from '../authentication/authentication.decorator';
import { Role } from '../authentication/authentication.enum';
import { Tag } from './Tag';


@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get(':uuid')
  @AuthenticationRequired()
  @HttpCode(HttpStatus.OK)
  async getTagById(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<Tag> {
    return this.tagsService.getTagById(uuid);
  }

  @Get()
  @AuthenticationRequired()
  @HttpCode(HttpStatus.OK)
  async getAllTags(): Promise<Tag[]> {
    return this.tagsService.getAllTags();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTag(
    @Body() createTagDto: CreateTagDto
    ): Promise<Tag> {
    return await this.tagsService.createTag(
      createTagDto
    );
  }

  @Patch(':uuid')
  @AuthenticationRequired()
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateTag(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateTagDto: UpdateTagDto
   ): Promise<Tag> {
    return this.tagsService.updateTag(uuid, updateTagDto);
  }

  @Delete(':uuid')
  @AuthenticationRequired()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTag(
    @Param('uuid', ParseUUIDPipe) uuid: string
    ): Promise<void> {
    return await this.tagsService.deleteTag(uuid);
  }
}
