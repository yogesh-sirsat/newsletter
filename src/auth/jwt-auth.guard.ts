import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Extract token from 'Bearer <token>'
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    return super.canActivate(context); // Proceed to validate the token
  }
}
