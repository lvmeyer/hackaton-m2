import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { LoginRequest, RegisterRequest } from './dto/authentication.request';
import { AuthenticationService } from './authentication.service';
import { Response } from 'express';

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
    const response = await this.authenticationService.login(loginRequest);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.cookie('accewwwss_token', 'test', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 3600,
    });
    res.json({ id: response.payload.id, email: response.payload.email });
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public register(@Body(ValidationPipe) registerRequest: RegisterRequest) {
    return this.authenticationService.register(registerRequest);
  }
}
