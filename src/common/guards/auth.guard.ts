import { JwtPayload } from './../../../node_modules/@types/jsonwebtoken/index.d';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TRequestUserMetadata } from 'src/utils/types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.getToken(request);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const payload = (await this.jwtService.verifyAsync(token)) as JwtPayload &
        TRequestUserMetadata['user'];

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Wrong token or credentials');
    }
    return true;
  }

  private getToken(req: Request) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('User is not authorized');
    }

    return authHeader.split(' ')[1];
  }
}
