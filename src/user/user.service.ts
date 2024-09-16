import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { Organization } from '../organization/entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    const isPasswordCorrect = await bcrypt.compare(
      loginUserDto.password,
      user.password_hash,
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Incorrect password');
    }
    return user;
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const isOrganizationExists = await this.organizationRepository.findOne({
      where: { id: registerUserDto.organization_id },
    });

    if (!isOrganizationExists) {
      throw new NotFoundException('Organization for given id does not exist');
    }

    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    const user = this.userRepository.create({
      ...registerUserDto,
      password_hash: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async findOne(id: any): Promise<User> {
    console.log(id);
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
