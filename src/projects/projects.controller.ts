import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';

@UseGuards(AuthGuard)
@Controller('workspaces/:workspaceId/projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get()
  async findAllProjectsByWorkspace(
    @Param('workspaceId', ParseIntPipe) workspaceId: number,
  ) {
    return await this.projectService.findAllProjectsByWorkspace(workspaceId);
  }

  @Post()
  async createProject(
    @Body() dto: CreateProjectDto,
    @Param('workspaceId', ParseIntPipe) workspaceId: number,
  ) {
    return await this.projectService.createProject(dto, workspaceId);
  }

  @Delete(':projectId')
  @HttpCode(204)
  async removeProjectById(
    @Param('workspaceId', ParseIntPipe) workspaceId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    await this.projectService.removeProjectById(workspaceId, projectId);
  }
}
