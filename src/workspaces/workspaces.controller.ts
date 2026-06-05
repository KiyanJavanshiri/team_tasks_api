import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { type Request as TRequest } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { WorkspacesService } from './workspaces.service';
import { TRequestUserMetadata } from 'src/utils/types';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';

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
}
