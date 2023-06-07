import { IsDefined, IsString } from 'class-validator';

export class CreateLevelRequest {
  @IsDefined()
  @IsString()
  public level: string;
}

export class UpdateLevelRequest {
  @IsDefined()
  @IsString()
  public level: string;

}
