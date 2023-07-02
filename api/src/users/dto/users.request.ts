import { IsDefined, IsEmail, IsEnum, IsString } from 'class-validator';
import { Role } from '../../authentication/authentication.enum';

export class CreateUserRequest {
  @IsDefined()
  @IsString()
  @IsEmail()
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

export class CreateWebMasterRequest {
  @IsDefined()
  @IsString()
  @IsEmail()
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

export class UpdateUserRequest {
  @IsDefined()
  @IsString()
  @IsEmail()
  public email: string;

  password: any;
}

export class UpdateProfileRequest {
  @IsDefined()
  @IsString()
  @IsEmail()
  public email: string;
}

export class UpdatePasswordRequest {
  @IsDefined()
  @IsString()
  public password: string;
}
