import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuleEntity } from './entities/module.entity';
import { Repository } from 'typeorm';
import { createModuleDto, updateModuleDto } from './dto/module.dto';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(ModuleEntity) private moduleRep: Repository<ModuleEntity>,
  ) {}

  async getModules(getInactive = true) {
    return getInactive
      ? await this.moduleRep.find()
      : await this.moduleRep.find({ isActive: true });
  }
  async getSingleModule(id: number, getInactive = true) {
    const module = getInactive
      ? await this.moduleRep.findOne(id)
      : await this.moduleRep.findOne(id, { where: { isActive: true } });
    if (!module) throw new NotFoundException('Could not find module');

    return module;
  }
  async createModule(payload: createModuleDto) {
    const newModule = this.moduleRep.create(payload);

    return await this.moduleRep.save(newModule);
  }
  async updateModule(payload: updateModuleDto, id: number) {
    const module = await this.getSingleModule(id, false);
    this.moduleRep.merge(module, payload);

    return await this.moduleRep.save(module);
  }
  async inactivateModule(id: number) {
    const module = await this.getSingleModule(id);
    this.moduleRep.merge(module, { isActive: false });

    return await this.moduleRep.save(module);
  }
  async activateModule(id: number) {
    const module = await this.getSingleModule(id);
    this.moduleRep.merge(module, { isActive: true });

    return await this.moduleRep.save(module);
  }
}
