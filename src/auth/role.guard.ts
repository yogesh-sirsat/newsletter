import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../user/entities/user.entity';

export const roleHierarchy = {
  [UserRole.SUPERADMIN]: 3,
  [UserRole.ADMIN]: 2,
  [UserRole.USER]: 1,
};

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<UserRole>('role', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRole) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const userRole = user?.role as UserRole;

    // Compare the hierarchy: user's role rank should be >= required role rank
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  }
}
