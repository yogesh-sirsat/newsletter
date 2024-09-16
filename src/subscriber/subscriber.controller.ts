import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SubscriberService } from './subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { Subscriber } from './entities/subscriber.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrganizationGuard } from '../common/organization.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, OrganizationGuard)
@ApiTags('Subscriber')
@Controller('subscriber')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Post()
  @ApiOperation({ description: 'Add a new subscriber' })
  async create(
    @Body() createSubscriberDto: CreateSubscriberDto,
  ): Promise<Subscriber> {
    return this.subscriberService.create(createSubscriberDto);
  }

  @Get()
  @ApiOperation({
    description: 'List subscribers with pagination and filtering',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'email',
    required: false,
    type: String,
    description: 'Filter by email address',
  })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('email') email?: string,
  ): Promise<Subscriber[]> {
    return this.subscriberService.findAll({
      page,
      limit,
      email,
    });
  }

  @Put(':id')
  @ApiOperation({ description: 'Update subscriber information' })
  @ApiParam({ name: 'id', type: String, description: 'Subscriber ID' })
  async update(
    @Param('id') id: string,
    @Body() updateSubscriberDto: UpdateSubscriberDto,
  ): Promise<Subscriber> {
    return this.subscriberService.update(id, updateSubscriberDto);
  }
}
