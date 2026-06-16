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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('projects')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('workspaces/:workspaceId/projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all workspace projects' })
  @ApiOkResponse({ description: 'List of projects' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Workspace was not found' })
  async findAllProjectsByWorkspace(
    @Param('workspaceId', ParseIntPipe) workspaceId: number,
  ) {
    return await this.projectService.findAllProjectsByWorkspace(workspaceId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a project' })
  @ApiCreatedResponse({ description: 'Created project' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Workspace was not found' })
  async createProject(
    @Body() dto: CreateProjectDto,
    @Param('workspaceId', ParseIntPipe) workspaceId: number,
  ) {
    return await this.projectService.createProject(dto, workspaceId);
  }

  @Delete(':projectId')
  @HttpCode(204)
  @ApiOperation({ summary: 'remove a project' })
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Workspace or project was not found' })
  async removeProjectById(
    @Param('workspaceId', ParseIntPipe) workspaceId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    await this.projectService.removeProjectById(workspaceId, projectId);
  }
}
