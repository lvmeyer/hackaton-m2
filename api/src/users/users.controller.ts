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
import { User } from './User';
import { UsersService } from './users.service';
import { CreateUserRequest, UpdateUserRequest } from './dto/users.request';
import {
  AuthenticationRequired,
  HasRole,
} from '../authentication/authentication.decorator';
import { Role } from '../authentication/authentication.enum';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@Req() req: Request & { access_token: string }) {
    console.log('REQUEST', req.cookies.access_token);
    if (!req?.cookies?.access_token) {
      throw new BadRequestException('User not connected');
    }

    try {
      return this.usersService.getMe(req.cookies.access_token);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body(ValidationPipe) createUserRequest: CreateUserRequest,
  ): Promise<User> {
    return await this.usersService.createUser(createUserRequest);
  }

  @AuthenticationRequired()
  @HasRole(Role.ADMINISTRATOR)
  @Get()
  @HttpCode(HttpStatus.OK)
  public getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':uuid')
  @AuthenticationRequired()
  @HttpCode(HttpStatus.OK)
  async findById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<User> {
    return this.usersService.getUserById(uuid);
  }

  @Patch(':uuid')
  @AuthenticationRequired()
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) updateUserRequest: UpdateUserRequest,
  ): Promise<any> {
    return await this.usersService.update(uuid, updateUserRequest);
  }

  @Delete(':uuid')
  @AuthenticationRequired()
  @HasRole(Role.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    return await this.usersService.delete(uuid);
  }
}
