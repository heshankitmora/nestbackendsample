import { IsNotEmpty,  IsUUID } from 'class-validator';

export class VerifyUuidDto {
    @IsUUID()
    @IsNotEmpty()
    readonly verification: string;
}