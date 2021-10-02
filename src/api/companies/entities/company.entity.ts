import { Address } from '../../common/address/entities/address.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { UserType } from '../../user-types/entities/user-types.entity';
import { ModuleEntity } from '../../modules/entities/module.entity';
import { Expose } from 'class-transformer';

@Entity({ name: 'companies' })
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'varchar', length: 200 })
  logo: string;

  @Column({ type: 'varchar', length: 100 })
  RFC: string;

  @Column({ type: 'varchar', length: 200 })
  commercial_line: string;

  @Column({ type: 'date' })
  date_registration: Date;

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

  @OneToOne(() => Address, (address) => address.company, { nullable: true })
  address: Address;

  @OneToMany(() => UserType, (userType) => userType.company)
  userTypes: UserType[];

  @ManyToMany(() => ModuleEntity, (module) => module.companies)
  @JoinTable({
    name: 'companies_has_modules',
    joinColumn: {
      name: 'company_id',
    },
    inverseJoinColumn: {
      name: 'module_id',
    },
  })
  modules: ModuleEntity[];

  @Expose()
  get modulesAvailable() {
    return this.modules.length;
  }
}
