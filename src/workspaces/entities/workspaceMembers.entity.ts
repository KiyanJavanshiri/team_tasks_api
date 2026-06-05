import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { MembersRoles } from 'src/common/enums/members-roles.enum';
import { Workspace } from './workspaces.entity';
import { User } from 'src/users/user.entity';

@Entity('workspace_members')
@Unique(['workspaceId', 'userId'])
export class WorkspaceMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  workspaceId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Workspace, (workspace) => workspace.workspaceMembers)
  @JoinColumn({ name: 'workspaceId' })
  workspace: Workspace;

  @ManyToOne(() => User, (user) => user.workspaceMembers)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'enum', enum: MembersRoles })
  role: MembersRoles;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  joinedAt: Date;
}
