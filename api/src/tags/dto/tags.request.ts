import { IsString, IsDefined, ValidateNested } from 'class-validator';
import { User } from '../../users/User';

export class CreateTagDto {
  @IsDefined()
  @IsString()
  public comment: string;

  @IsDefined()
  @ValidateNested()
  public user: User;
}

export class UpdateTagDto {
  @IsString()
  readonly comment: string;
  }