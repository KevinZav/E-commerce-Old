import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserModuleDto } from '../dtos/user-module.dto';
import { UserModule } from '../entities/user-module.entity';
import { User } from '../entities/users.entity';
import { ModuleEntity } from '../../modules/entities/module.entity';

@Injectable()
export class UserModuleService {
  constructor(
    @InjectRepository(UserModule)
    private userModuleRep: Repository<UserModule>,
    @InjectRepository(User) private userRep: Repository<User>,
    @InjectRepository(ModuleEntity) private moduleRep: Repository<ModuleEntity>,
  ) {}

  async getUserModules() {
    const userModules = await this.userModuleRep.find();

    return userModules;
  }

  async createUserModule(payload: createUserModuleDto) {
    const user = await this.userRep.findOne(payload.userId);
    const module = await this.moduleRep.findOne(payload.moduleId);

    if (!user || !module)
      throw new BadRequestException('Could not find module or user');

    const newUserModule = this.userModuleRep.create(payload);

    newUserModule.user = user;
    newUserModule.module = module;
    if (!newUserModule) {
      throw new BadRequestException('Could not be create user-module');
    }
    return await this.userModuleRep.save(newUserModule);
  }

  async activateUserModule(id: number) {
    const userModule = await this.userModuleRep.findOne(id);
    if (!userModule)
      throw new NotFoundException('Could not be found userModule');

    this.userModuleRep.merge(userModule, { isActive: true });

    return await this.userModuleRep.save(userModule);
  }

  async inactivateUserModule(id: number) {
    const userModule = await this.userModuleRep.findOne(id);
    if (!userModule)
      throw new NotFoundException('Could not be found userModule');

    this.userModuleRep.merge(userModule, { isActive: false });

    return await this.userModuleRep.save(userModule);
  }
}
