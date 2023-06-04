import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginRequest, RegisterRequest } from './dto/authentication.request';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(
    loginRequest: LoginRequest,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.getUserByEmail(loginRequest.email);

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isValidPassword = await compare(loginRequest.password, user.password);

    if (!isValidPassword) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  public async register(registerRequest: RegisterRequest) {
    const user = await this.usersService.getUserByEmail(registerRequest.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await hash(registerRequest.password, saltRounds);
    await this.usersService.createUser({
      email: registerRequest.email,
      password: hashedPassword,
    });
  }
}
