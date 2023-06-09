import { IsDecimal, IsDefined, IsString, IsDate, IsDateString } from 'class-validator';
import { Level } from '../../level/Level';

export class CreateMissionRequest {
    @IsDefined()
    @IsString()
    public title: string;

    @IsDefined()
    @IsString()
    public description: string;

    @IsDefined()
    @IsDecimal()
    public points: number;

    @IsDefined()
    @IsString()
    public entreprise: string;

    @IsDefined()
    @IsDateString()
    startMission: Date;

    @IsDateString()
    endMission: Date;
}

export class UpdateMissionRequest {
    @IsDefined()
    @IsString()
    public title: string;

    @IsDefined()
    @IsString()
    public description: string;

    @IsDefined()
    @IsDecimal()
    public points: number;

    @IsDefined()
    @IsDate()
    startMission: Date;

    @IsDefined()
    @IsDate()
    endMission: Date;
}