import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: 'The email address of the user', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password for the user', required: true })
  @IsString()
  password: string;
}
