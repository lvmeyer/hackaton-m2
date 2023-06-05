import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User';
import { Repository } from 'typeorm';
import {
  CreateUserRequest,
  UpdateProfileRequest,
  UpdateUserRequest,
} from './dto/users.request';
import { hash } from 'bcryptjs';
import { Role } from '../authentication/authentication.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getMe(access_token: string): Promise<User> {
    console.log('access_token', access_token);
    const email = this.jwtService.verify(access_token, {
      secret: process.env.JWT_SECRET,
    }).email;

    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async updateProfile(
    access_token: string,
    updateProfileRequest: UpdateProfileRequest,
  ): Promise<any> {
    const user = await this.getMe(access_token);

    await this.usersRepository.update(user.id, {
      email: updateProfileRequest.email,
    });

    return { message: 'Profile updated successfully' };
  }

  async createUser(createUserRequest: CreateUserRequest): Promise<any> {
    try {
      return await this.usersRepository.save(createUserRequest);
    } catch (err) {
      throw new InternalServerErrorException(err.driverError.message);
    }
  }

  public getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async getUserById(uuid: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: uuid });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(
    uuid: string,
    updateUserRequest: UpdateUserRequest,
  ): Promise<any> {
    try {
      if (updateUserRequest.password) {
        throw new BadRequestException(
          'Password cannot be updated using this endpoint',
        );
      }
      const user = await this.usersRepository.findOneBy({ id: uuid });
      if (!user) {
        throw new NotFoundException('User not found for update');
      }
      return await this.usersRepository.update(uuid, updateUserRequest);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async delete(uuid: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ id: uuid });
    if (!user) {
      throw new NotFoundException('User not found for deletion');
    }

    await this.usersRepository.remove(user);
  }

  public async seed() {
    const userPassword = await hash('password', 10);
    const administratorPassword = await hash('password', 10);

    await this.usersRepository.delete({});

    await this.usersRepository.insert({
      role: Role.ADMINISTRATOR,
      email: 'admin@admin.com',
      password: administratorPassword,
    });

    return this.usersRepository.insert({
      role: Role.USER,
      email: 'user@user.com',
      password: userPassword,
    });
  }
}
