import { IsDefined, IsString } from 'class-validator';

export class CreateFormationRequest {
  @IsDefined()
  @IsString()
  public title: string;
}

export class UpdateFormationRequest {
  @IsDefined()
  @IsString()
  public title: string;

}
