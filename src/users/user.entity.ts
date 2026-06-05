import { WorkspaceMember } from 'src/workspaces/entities/workspaceMembers.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 220, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 220, unique: true, nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false, select: false })
  password: string;

  @Column({ type: 'text', nullable: true })
  avatar: string;

  @OneToMany(() => WorkspaceMember, (workspaceMember) => workspaceMember.user)
  workspaceMembers: WorkspaceMember[];

  @CreateDateColumn()
  createdAt: Date;
}
