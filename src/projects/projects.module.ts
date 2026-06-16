import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { Workspace } from 'src/workspaces/entities/workspaces.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Workspace])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
