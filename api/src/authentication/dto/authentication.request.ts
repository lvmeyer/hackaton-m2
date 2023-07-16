import { IsDefined, IsString, IsEnum } from 'class-validator';
import { Role } from '../../authentication/authentication.enum';

export class LoginRequest {
  @IsDefined()
  @IsString()
  public email: string;

  @IsDefined()
  @IsString()
  public password: string;
}

export class RegisterRequest {
  @IsDefined()
  @IsString()
  public email: string;

  @IsDefined()
  @IsString()
  public password: string;

  @IsDefined()
  @IsString()
  firstname: string;

  @IsDefined()
  @IsString()
  lastname: string;
}


export class RegisterWebMasterRequest {
  @IsDefined()
  @IsString()
  public email: string;

  @IsDefined()
  @IsString()
  public password: string;

  @IsDefined()
  @IsString()
  firstname: string;

  @IsDefined()
  @IsString()
  lastname: string;

  @IsDefined()
  @IsEnum(Role)
  role: Role;
}