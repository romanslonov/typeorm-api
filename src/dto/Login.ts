import { IsString, MinLength, IsEmail } from 'class-validator';

export default class LoginDto {
  @IsEmail({}, { message: 'Email is not valid.' })
  public email: string;

  @MinLength(6, { message: 'Password should be at least 6 characters long.' })
  @IsString({ message: 'Password should be a string.' })
  public password: string;
}