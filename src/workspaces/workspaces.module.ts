import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './entities/workspaces.entity';
import { WorkspaceMember } from './entities/workspaceMembers.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, WorkspaceMember, User])],
  controllers: [],
  providers: [],
})
export class WorkspacesModule {}
