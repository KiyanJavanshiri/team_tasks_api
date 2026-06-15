import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { type Request as TRequest } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { WorkspacesService } from './workspaces.service';
import { TRequestUserMetadata } from 'src/utils/types';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { MembersRoles } from 'src/common/enums/members-roles.enum';

@Controller('workspaces')
@UseGuards(AuthGuard)
export class WorkspacesController {
  constructor(private readonly workspaceService: WorkspacesService) {}

  @Get()
  async getUsersWorkspaces(@Request() req: TRequest) {
    const userId = (req as TRequestUserMetadata).user.id;
    return this.workspaceService.getUsersWorkspaces(userId);
  }

  @Post()
  async createUsersWorkspaces(
    @Body() dto: CreateWorkspaceDto,
    @Request() req: TRequest,
  ) {
    const userId = (req as TRequestUserMetadata).user.id;
    return this.workspaceService.createUsersWorkspace(dto, userId);
  }

  @Post(':workspaceId/member/:userId')
  @Roles(MembersRoles.OWNER)
  @UseGuards(RoleGuard)
  async addUserToWorkspace(
    @Param('workspaceId', ParseIntPipe) workspaceId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return await this.workspaceService.addUserToWorkspace(userId, workspaceId);
  }

  @Delete(':workspaceId/member/:userId')
  @Roles(MembersRoles.OWNER)
  @UseGuards(RoleGuard)
  @HttpCode(204)
  async removeUserFromWorkspace(
    @Param('workspaceId', ParseIntPipe) workspaceId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    await this.workspaceService.removeUserFromWorkspace(userId, workspaceId);
  }
}
