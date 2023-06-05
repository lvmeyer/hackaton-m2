import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { LoginRequest, RegisterRequest } from './dto/authentication.request';
import { AuthenticationService } from './authentication.service';
import { Response, Request } from 'express';

@Controller('authentication')
export class AuthenticationController {
  public constructor(
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(
    @Body(ValidationPipe) loginRequest: LoginRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const jwt = await this.authenticationService.login(loginRequest);
    console.log('PROCESS_ENV', process.env.NODE_ENV);

    res.cookie('access_token', jwt.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 3600,
    });
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public register(@Body(ValidationPipe) registerRequest: RegisterRequest) {
    return this.authenticationService.register(registerRequest);
  }
}
