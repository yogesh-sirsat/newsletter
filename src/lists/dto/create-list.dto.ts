import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateListDto {
  @ApiProperty({ description: 'The name of the list' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The organization id the list belongs to' })
  @IsUUID()
  organization_id: string;

  @ApiProperty({
    description: 'The custom fields for the list',
    required: false,
    type: 'object', // Swagger can handle this as a JSON object
  })
  @IsOptional()
  custom_fields?: Record<string, any>;
}
