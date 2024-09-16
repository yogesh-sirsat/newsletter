import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { RequestContextService } from '../common/request-context.service';
import * as nodemailer from 'nodemailer';
import { List } from '../lists/entities/list.entity';

@Injectable()
export class CampaignService {
  private readonly organization_id: string;
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly requestContextService: RequestContextService,
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {
    this.organization_id = this.requestContextService.getOrganizationId();

    this.transporter = nodemailer.createTransport({
      // @ts-expect-error/ passing from .env file so no types for now
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async findAll(): Promise<Campaign[]> {
    return this.campaignRepository.find({
      where: { organization_id: this.organization_id },
    });
  }

  async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    if (this.organization_id !== createCampaignDto.organization_id) {
      throw new ForbiddenException('Invalid organization access');
    }
    const campaign = this.campaignRepository.create(createCampaignDto);
    return this.campaignRepository.save(campaign);
  }

  async send(id: string): Promise<any> {
    const campaign = await this.campaignRepository.findOne({ where: { id } });
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }
    if (campaign.organization_id !== this.organization_id) {
      throw new ForbiddenException('Invalid organization access');
    }
    const list = await this.listRepository.findOne({
      where: { id: campaign.list_id },
      relations: ['subscribers'],
    });

    if (!list) {
      throw new NotFoundException('Campaign list not found');
    }

    const subscribers = list.subscribers;

    const mailOptions = {
      from: 'Newsletter <process.env.SMTP_FROM>',
      to: subscribers.join(', '),
      subject: campaign.subject,
      text: campaign.content,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
