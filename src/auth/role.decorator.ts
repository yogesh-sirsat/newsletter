import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../user/entities/user.entity';

export const HasRole = (role: UserRole) => SetMetadata('role', role);
