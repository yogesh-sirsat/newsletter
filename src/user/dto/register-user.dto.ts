import { IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class RegisterUserDto {
  @ApiProperty({ description: 'The email address of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password for the user' })
  @IsString()
  password: string;

  @ApiProperty({ enum: UserRole, description: 'The role of the user' })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    description: 'The id of the organization the user belongs to',
  })
  @IsUUID()
  organization_id: string;
}
