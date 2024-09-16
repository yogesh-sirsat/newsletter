import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrganizationGuard } from '../common/organization.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, OrganizationGuard)
@ApiTags('List')
@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  @ApiOperation({ description: 'Add a new list' })
  async create(@Body() createListDto: CreateListDto): Promise<List> {
    return this.listsService.create(createListDto);
  }

  @Get()
  @ApiOperation({ description: 'List all lists for the organization.' })
  async findAll(): Promise<List[]> {
    return this.listsService.findAll();
  }

  @Put(':id')
  @ApiOperation({ description: 'Update list information' })
  @ApiParam({ name: 'id', type: String, description: 'List ID' })
  async update(
    @Param('id') id: string,
    @Body() updateListDto: UpdateListDto,
  ): Promise<List> {
    return this.listsService.update(id, updateListDto);
  }
}
