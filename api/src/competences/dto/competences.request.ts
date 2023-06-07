import { IsBoolean, IsDefined, IsString } from 'class-validator';

export class CreateCompetenceRequest {
    @IsDefined()
    @IsString()
    public competence: string;

    @IsDefined()
    @IsBoolean()
    public password: boolean;
}

export class UpdateCompetenceRequest {
    @IsDefined()
    @IsString()
    public competence: string;

    @IsDefined()
    @IsBoolean()
    public password: boolean;
}