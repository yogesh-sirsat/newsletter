import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSubscriberDto {
  @ApiProperty({ description: 'The email address of the subscriber' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The organization id the subscriber belongs to' })
  @IsUUID()
  organization_id: string;

  @ApiProperty({
    description: 'The custom fields for the subscriber',
    required: false,
    type: 'object', // Swagger can handle this as a JSON object
  })
  @IsOptional()
  custom_fields?: Record<string, any>;

  @ApiProperty({
    description: 'The GPG public key for the subscriber',
    required: false,
  })
  @IsOptional()
  @IsString()
  gpg_public_key?: string;
}
