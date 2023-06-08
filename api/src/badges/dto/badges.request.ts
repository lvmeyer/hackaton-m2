import { IsDefined, IsString } from 'class-validator';

export class CreateBadgeRequest {
  @IsDefined()
  @IsString()
  public badge: string;
}

export class UpdateBadgeRequest {
  @IsDefined()
  @IsString()
  public badge: string;

}
