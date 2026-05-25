import {
  Column,
  CreateDateColumn,
  Entity,
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

  @CreateDateColumn()
  createdAt: Date;
}
