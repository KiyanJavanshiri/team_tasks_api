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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('workspaces')
@ApiBearerAuth()
@Controller('workspaces')
@UseGuards(AuthGuard)
export class WorkspacesController {
  constructor(private readonly workspaceService: WorkspacesService) {}

  @Get()
  @ApiOperation({ summary: 'Getting all user"s workspaces' })
  @ApiOkResponse({ description: 'List of all user"s workspaces' })
  async getUsersWorkspaces(@Request() req: TRequest) {
    const userId = (req as TRequestUserMetadata).user.id;
    return this.workspaceService.getUsersWorkspaces(userId);
  }

  @Post()
  @ApiOperation({ summary: 'creating workspaces' })
  @ApiCreatedResponse({ description: 'Created workspace' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async createUsersWorkspaces(
    @Body() dto: CreateWorkspaceDto,
    @Request() req: TRequest,
  ) {
    const userId = (req as TRequestUserMetadata).user.id;
    return this.workspaceService.createUsersWorkspace(dto, userId);
  }

  @Delete(':workspaceId')
  @Roles(MembersRoles.OWNER)
  @UseGuards(RoleGuard)
  @HttpCode(204)
  @ApiOperation({ summary: 'removing workspace' })
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ description: 'Validation error' })
  async removeUsersWorkspace(
    @Param('workspaceId', ParseIntPipe) workspaceId: number,
  ) {
    await this.workspaceService.removeUsersWorkspace(workspaceId);
  }

  @Post(':workspaceId/member/:userId')
  @Roles(MembersRoles.OWNER)
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'adding new member to workspace' })
  @ApiCreatedResponse({ description: 'Added member' })
  @ApiBadRequestResponse({ description: 'Validation error' })
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
  @ApiOperation({ summary: 'remove member from workspace' })
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ description: 'Validation error' })
  async removeUserFromWorkspace(
    @Param('workspaceId', ParseIntPipe) workspaceId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    await this.workspaceService.removeUserFromWorkspace(userId, workspaceId);
  }
}
