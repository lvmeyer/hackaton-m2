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
  UpdatePasswordRequest,
} from './dto/users.request';
import { hash } from 'bcryptjs';
import { Role } from '../authentication/authentication.enum';
import { JwtService } from '@nestjs/jwt';
import { Competence } from '../competences/Competence';
import { UserCompetences } from '../user-competences/UserCompetences';
import { randomInt } from 'crypto';
import { Badges } from '../badges/Badges';
import { Mission } from '../missions/Mission';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Mission)
    private readonly missionsRepository: Repository<Mission>,
    @InjectRepository(Competence)
    private readonly competencesRepository: Repository<Competence>,
    @InjectRepository(UserCompetences)
    private readonly usercompetencesRepository: Repository<UserCompetences>,
    private readonly jwtService: JwtService,
    @InjectRepository(Badges)
    private readonly badgesRepository: Repository<Badges>,
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

  async updatePassword(
    access_token: string,
    updatePasswordRequest: UpdatePasswordRequest,
  ): Promise<any> {
    const user = await this.getMe(access_token);
    const NewPassword = await hash(updatePasswordRequest.password, 10);

    await this.usersRepository.update(user.id, {
      password: NewPassword,
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

  async findUserCompetences(uuid: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: uuid,
      },
      relations: ['userCompetences', 'userCompetences.competence'],
    });
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

    await this.usercompetencesRepository.delete({});
    await this.missionsRepository.delete({});
    await this.usersRepository.delete({});

    const competence = await this.competencesRepository.findOneBy({
      competence: 'Java',
    });
    const competence2 = await this.competencesRepository.findOneBy({
      competence: '.NET',
    });
    const competence3 = await this.competencesRepository.findOneBy({
      competence: 'Node.js',
    });
    const competence4 = await this.competencesRepository.findOneBy({
      competence: 'Angular',
    });
    const competence5 = await this.competencesRepository.findOneBy({
      competence: 'React.js',
    });
    const competence6 = await this.competencesRepository.findOneBy({
      competence: 'Vue.js',
    });
    const badge1 = await this.badgesRepository.findOneBy({
      badge: 'Junior php',
    })
    const badge2 = await this.badgesRepository.findOneBy({
      badge: 'Expert JAVA',
    })
    const administrator = this.usersRepository.create({
      role: Role.ADMINISTRATOR,
      email: 'admin@admin.com',
      firstname: 'Pierre',
      lastname: 'Boitelle',
      password: administratorPassword
    });
    await this.usersRepository.save(administrator);

    const user = this.usersRepository.create({
      role: Role.USER,
      email: 'user@user.com',
      firstname: 'Odessa',
      lastname: 'Chesneau',
      password: userPassword,
      Badges: [badge1, badge2]
    });
    await this.usersRepository.save(user);


    const userCompetences = this.usercompetencesRepository.create({
      user: user,
      competence: competence,
      points: randomInt(1, 100)
    });
    await this.usercompetencesRepository.save(userCompetences);

    const userCompetences2 = this.usercompetencesRepository.create({
      user: user,
      competence: competence2,
      points: randomInt(1, 100)
    });
    await this.usercompetencesRepository.save(userCompetences2);
  }
}
