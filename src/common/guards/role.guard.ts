import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MembersRoles } from '../enums/members-roles.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { TRequestUserMetadata } from 'src/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkspaceMember } from 'src/workspaces/entities/workspaceMembers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(WorkspaceMember)
    private readonly workspaceMemberRepository: Repository<WorkspaceMember>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<MembersRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest<TRequestUserMetadata>();

    const userId = request.user.id;
    const workspaceId = Number(request.params.workspaceId);

    const member = await this.workspaceMemberRepository.findOne({
      where: {
        userId,
        workspaceId,
      },
      select: {
        role: true,
      },
    });

    if (!member) {
      throw new UnauthorizedException('user is not authorized');
    }

    const isPermit = requiredRoles.some((role) => member.role === role);

    if (!isPermit) {
      throw new ForbiddenException(
        'User don"t have enough rights for this action',
      );
    }

    return true;
  }
}
