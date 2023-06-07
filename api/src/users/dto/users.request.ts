import { IsDefined, IsEmail, IsString } from 'class-validator';

export class CreateUserRequest {
  @IsDefined()
  @IsString()
  @IsEmail()
  public email: string;

  @IsDefined()
  @IsString()
  public password: string;
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
