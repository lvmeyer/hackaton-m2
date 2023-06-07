import { IsDecimal, IsDefined, IsString, IsDate } from 'class-validator';

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
    @IsDate()
    startMission: Date;

    @IsDefined()
    @IsDate()
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