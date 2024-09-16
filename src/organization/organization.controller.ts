import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UserRole } from '../user/entities/user.entity';
import { HasRole } from '../auth/role.decorator';
import { RoleGuard } from '../auth/role.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Organization')
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @ApiOperation({ description: 'Create a new organization' })
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @HasRole(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @Get()
  @ApiOperation({ description: 'Get list of all organizations(Admin only)' })
  findAll() {
    return this.organizationService.findAll();
  }
}
