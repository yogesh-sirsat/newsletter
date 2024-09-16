import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from './entities/campaign.entity';
import { Organization } from '../organization/entities/organization.entity';
import { CommonModule } from '../common/common.module';
import { List } from '../lists/entities/list.entity';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([Campaign, Organization, List]),
  ],
  controllers: [CampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}
