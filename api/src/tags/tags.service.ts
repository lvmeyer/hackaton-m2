
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './Tag';
import { CreateTagDto, UpdateTagDto } from './dto/tags.request';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly TagRepository: Repository<Tag>,
  ) {}

  async getAllTags(): Promise<Tag[]> {
    return this.TagRepository.find();
  }

  async getTagById(uuid: string): Promise<Tag> {
    const options: FindOneOptions<Tag> = { where: { id: uuid } };
    const tag = await this.TagRepository.findOne(options);
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    return tag;
  }

  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = this.TagRepository.create(createTagDto);
    return this.TagRepository.save(tag);
  }

  async updateTag(uuid: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.getTagById(uuid);
    tag.comment = updateTagDto.comment;
    return this.TagRepository.save(tag);
  }

  async deleteTag(uuid: string): Promise<void> {
    const tag = await this.getTagById(uuid);
    await this.TagRepository.remove(tag);
  }

  public async seed() {
    await this.TagRepository.delete({});
  }

}