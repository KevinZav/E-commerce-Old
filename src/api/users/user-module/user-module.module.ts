import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { ModuleEntity } from '../../modules/entities/module.entity';
import { UserModule } from '../entities/user-module.entity';
import { UserModuleController } from './user-module.controller';
import { UserModuleService } from './user-module.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, ModuleEntity, UserModule])],
  controllers: [UserModuleController],
  providers: [UserModuleService],
})
export class UserModuleModule {}
