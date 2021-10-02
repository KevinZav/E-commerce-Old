import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './users.entity';
import { ModuleEntity } from '../../modules/entities/module.entity';

@Entity({ name: 'users_has_modules' })
export class UserModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.modules)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => ModuleEntity)
  @JoinColumn({ name: 'module_id' })
  module: ModuleEntity;
}
