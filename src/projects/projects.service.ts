import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { Repository } from 'typeorm';
import { Workspace } from 'src/workspaces/entities/workspaces.entity';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  async findAllProjectsByWorkspace(workspaceId: number) {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        id: workspaceId,
      },
    });

    if (!workspace) {
      throw new NotFoundException(
        `workspace with id ${workspaceId} was not found`,
      );
    }

    return await this.projectRepository.find({
      where: {
        workspaceId,
      },
    });
  }

  async createProject(dto: CreateProjectDto, workspaceId: number) {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        id: workspaceId,
      },
    });

    if (!workspace) {
      throw new NotFoundException(
        `workspace with id ${workspaceId} was not found`,
      );
    }

    const project = this.projectRepository.create({ ...dto, workspaceId });

    return await this.projectRepository.save(project);
  }

  async removeProjectById(workspaceId: number, projectId: number) {
    const project = await this.projectRepository.findOne({
      where: {
        id: projectId,
        workspaceId,
      },
    });

    if (!project) {
      throw new NotFoundException(
        `project with id ${projectId} in workspace ${workspaceId} was not found`,
      );
    }

    await this.projectRepository.remove(project);
  }
}
