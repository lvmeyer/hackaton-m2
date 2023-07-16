import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTunnelDto {
  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  tags: string[];
}

export class UpdateTunnelDto {
  @IsNotEmpty()
  @IsString()
  comment: string;
}
