import { ProjectStatus } from 'src/common/enums/project-status.enum';
import { Workspace } from 'src/workspaces/entities/workspaces.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 220, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 220, nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: () => ProjectStatus.ACTIVE,
  })
  status: ProjectStatus;

  @Column({ type: 'date', nullable: false })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  deadline: Date;

  @ManyToOne(() => Workspace, (workspace) => workspace.projects)
  workspace: Workspace;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
