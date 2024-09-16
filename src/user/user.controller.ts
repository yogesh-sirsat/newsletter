import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './entities/user.entity';

@ApiBearerAuth()
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  @ApiOperation({ description: 'Register a new user' })
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  @Post('login')
  @ApiOperation({ description: 'Login a user' })
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.validateUser(loginUserDto);
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ description: 'Get a user by id' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
