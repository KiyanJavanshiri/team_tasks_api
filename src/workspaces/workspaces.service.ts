import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './entities/workspaces.entity';
import { Repository, DataSource } from 'typeorm';
import { WorkspaceMember } from './entities/workspaceMembers.entity';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { MembersRoles } from 'src/common/enums/members-roles.enum';

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
}
