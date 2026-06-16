import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './entities/workspaces.entity';
import { Repository, DataSource } from 'typeorm';
import { WorkspaceMember } from './entities/workspaceMembers.entity';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { MembersRoles } from 'src/common/enums/members-roles.enum';
import { User } from 'src/users/user.entity';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    @InjectRepository(WorkspaceMember)
    private readonly workspaceMemberRepository: Repository<WorkspaceMember>,
    private readonly dataSource: DataSource,
  ) {}

  async getUsersWorkspaces(userId: number) {
    const workspaces = await this.workspaceMemberRepository.find({
      where: {
        userId,
      },
      relations: {
        workspace: true,
      },
      select: {
        id: true,
        workspace: true,
        role: true,
        joinedAt: true,
      },
    });

    return workspaces;
  }

  async createUsersWorkspace(dto: CreateWorkspaceDto, userId: number) {
    return await this.dataSource.transaction(async (manager) => {
      const workspace = manager.create(Workspace, dto);

      const savedWorkspace = await manager.save(workspace);

      const workspaceMember = manager.create(WorkspaceMember, {
        workspaceId: savedWorkspace.id,
        userId,
        role: MembersRoles.OWNER,
      });

      await manager.save(workspaceMember);

      return savedWorkspace;
    });
  }

  async removeUsersWorkspace(workspaceId: number) {
    return await this.dataSource.transaction(async (manager) => {
      await manager.delete(Workspace, {
        id: workspaceId,
      });

      await manager.delete(WorkspaceMember, {
        workspaceId,
      });
    });
  }

  async getAllWorkspaceMembers(workspaceId: number) {
    return await this.workspaceMemberRepository.find({
      where: {
        workspaceId,
      },
      relations: {
        user: true,
      },
      select: {
        user: true,
      },
    });
  }

  async addUserToWorkspace(userId: number, workspaceId: number) {
    return await this.dataSource.transaction(async (manager) => {
      const workspace = await manager.findOne(Workspace, {
        where: {
          id: workspaceId,
        },
      });
      const user = await manager.findOne(User, {
        where: {
          id: userId,
        },
      });

      if (!workspace || !user) {
        throw new BadRequestException('user or workspace is not exists');
      }

      const isMemberExists = await manager.findOne(WorkspaceMember, {
        where: {
          workspaceId,
          userId,
        },
      });

      if (isMemberExists) {
        throw new BadRequestException('user is already a member');
      }

      const workspaceMember = manager.create(WorkspaceMember, {
        workspaceId,
        userId,
        role: MembersRoles.MEMBER,
      });

      return await manager.save(workspaceMember);
    });
  }

  async removeUserFromWorkspace(userId: number, workspaceId: number) {
    const membership = await this.workspaceMemberRepository.findOne({
      where: {
        workspaceId,
        userId,
      },
    });

    if (!membership) {
      throw new NotFoundException('membership was not found');
    }

    await this.workspaceMemberRepository.remove(membership);
  }
}
