import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateCampaignDto {
  @ApiProperty({ description: 'The subject of the campaign' })
  @IsString()
  subject: string;

  @ApiProperty({ description: 'The content of the campaign' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'The list id the the campaign belongs to' })
  @IsUUID()
  list_id: string;

  @ApiProperty({ description: 'The organization id the campaign belongs to' })
  @IsUUID()
  organization_id: string;
}
