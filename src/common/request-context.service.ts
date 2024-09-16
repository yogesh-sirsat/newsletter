import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {
  private organizationId: string;

  setOrganizationId(organizationId: string) {
    this.organizationId = organizationId;
  }

  getOrganizationId(): string {
    return this.organizationId;
  }
}
