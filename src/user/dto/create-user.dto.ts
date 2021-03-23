import { IsNotEmpty, MinLength, IsEmail, IsString, IsInt } from 'class-validator';

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    readonly lastName: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsNotEmpty()
    @IsInt()
    readonly type: number;
}