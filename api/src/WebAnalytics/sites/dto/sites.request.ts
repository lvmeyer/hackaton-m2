import { IsDefined, IsString } from 'class-validator';

import { User } from '../../../users/User';

export class CreateSiteRequest {
    @IsDefined()
    @IsString()
    public link: string;

    @IsDefined()
    public user: User;
}