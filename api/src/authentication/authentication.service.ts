import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginRequest, RegisterRequest, RegisterWebMasterRequest } from './dto/authentication.request';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../authentication/authentication.enum';

@Injectable()
export class AuthenticationService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(
    loginRequest: LoginRequest,
  ): Promise<{ access_token: string; payload: any }> {
    const user = await this.usersService.getUserByEmail(loginRequest.email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isValidPassword = await compare(loginRequest.password, user.password);

    if (!isValidPassword) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      isValid: user.isValid,
    };

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d',
    });

    return { access_token, payload };
  }



  public async register(registerRequest: RegisterRequest) {
    const user = await this.usersService.getUserByEmail(registerRequest.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await hash(registerRequest.password, saltRounds);
    const newUser = await this.usersService.createUser({
      email: registerRequest.email,
      password: hashedPassword,
      firstname: registerRequest.firstname,
      lastname: registerRequest.lastname,
    });

    return newUser;
  }



  public async registerWebMaster(registerWebMasterRequest: RegisterWebMasterRequest) {
    const user = await this.usersService.getUserByEmail(registerWebMasterRequest.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await hash(registerWebMasterRequest.password, saltRounds);
    const newUser = await this.usersService.createWebMaster({
      email: registerWebMasterRequest.email,
      password: hashedPassword,
      firstname: registerWebMasterRequest.firstname,
      lastname: registerWebMasterRequest.lastname,
      role: registerWebMasterRequest.role,
    });

    return newUser;
  }
}
