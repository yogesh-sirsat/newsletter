import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { Campaign } from './entities/campaign.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrganizationGuard } from '../common/organization.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, OrganizationGuard)
@ApiTags('Campaign')
@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @ApiOperation({ description: 'Add a new campaign' })
  async create(
    @Body() createCampaignDto: CreateCampaignDto,
  ): Promise<Campaign> {
    return this.campaignService.create(createCampaignDto);
  }

  @Get()
  @ApiOperation({ description: 'List all campaigns for the organization.' })
  async findAll(): Promise<Campaign[]> {
    return this.campaignService.findAll();
  }

  @Post(':id/send')
  @ApiOperation({ description: 'Send a campaign' })
  @ApiParam({ name: 'id', type: String, description: 'Campaign ID' })
  async send(@Param('id') id: string): Promise<Campaign> {
    return this.campaignService.send(id);
  }
}
