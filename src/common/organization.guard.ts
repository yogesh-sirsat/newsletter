import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RequestContextService } from './request-context.service';

@Injectable()
export class OrganizationGuard implements CanActivate {
  constructor(private readonly requestContextService: RequestContextService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Ensure the user has an organization ID
    if (!user || !user.organization_id) {
      throw new ForbiddenException('Invalid organization access');
    }

    // Allow access based on user's organization ID (implicitly)
    request.organization_id = user.organization_id; // Attach to the request to use in controllers
    this.requestContextService.setOrganizationId(user.organization_id); // Attach to the request context service

    return true;
  }
}
