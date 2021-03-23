import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @IsString()
    readonly _id: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsString()
    readonly accessToken: string;

    @IsString()
    readonly refreshToken: string;
}