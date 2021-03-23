import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsString()
    readonly accessToken: string;

    @IsString()
    readonly refreshToken: string;
}