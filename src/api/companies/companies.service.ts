import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { createCompanyDto, updateCompanyDto } from './dtos/company.dto';
import { ModuleEntity } from '../modules/entities/module.entity';

@Injectable()
export class CompaniesService {
  relations = ['address', 'userTypes', 'modules'];
  constructor(
    @InjectRepository(Company) private companyRep: Repository<Company>,
    @InjectRepository(ModuleEntity) private moduleRep: Repository<ModuleEntity>,
  ) {}

  async getCompanies(getInactive = true) {
    return getInactive
      ? await this.companyRep.find({
          relations: this.relations,
        })
      : await this.companyRep.find({
          relations: this.relations,
          where: { isActive: true },
        });
  }

  async getSingleCompany(id: number, getInactive = true) {
    const company = getInactive
      ? await this.companyRep.findOne(id, { relations: this.relations })
      : await this.companyRep.findOne(id, {
          relations: this.relations,
          where: { isActive: true },
        });

    if (!company) throw new NotFoundException('Could not find company');

    return company;
  }

  async createCompany(payload: createCompanyDto) {
    const newCompany = this.companyRep.create(payload);
    if (!newCompany) throw new BadRequestException('Could not create company');
    if (payload.modulesIds) {
      const modules = await this.moduleRep.findByIds(payload.modulesIds);
      newCompany.modules = modules;
    }
    return await this.companyRep.save(newCompany);
  }

  async updateCompany(id: number, payload: updateCompanyDto) {
    const company = await this.getSingleCompany(id, false);
    this.companyRep.merge(company, payload);

    return await this.companyRep.save(company);
  }

  async inactivateCompany(id: number) {
    const company = await this.getSingleCompany(id);
    this.companyRep.merge(company, { isActive: false });

    return await this.companyRep.save(company);
  }

  async activateCompany(id: number) {
    const company = await this.getSingleCompany(id);
    this.companyRep.merge(company, { isActive: true });

    return await this.companyRep.save(company);
  }

  async removeModuleCompany(idCompany: number, idModule: number) {
    const company = await this.getSingleCompany(idCompany);
    company.modules = company.modules.filter(
      (module) => module.id !== idModule,
    );

    return await this.companyRep.save(company);
  }

  async addModuleCompany(idCompany: number, idModule: number) {
    const company = await this.getSingleCompany(idCompany);
    const module = await this.moduleRep.findOne(idModule);
    if (!module) throw new NotFoundException(`Could not found module`);

    company.modules.push(module);

    return await this.companyRep.save(company);
  }
}
