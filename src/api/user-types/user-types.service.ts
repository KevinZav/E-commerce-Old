import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserType } from './entities/user-types.entity';
import { Repository } from 'typeorm';
import { createUserTypeDto, updateUserTypeDto } from './dtos/user-type.dto';
import { CompaniesService } from '../companies/companies.service';
import { FilterDto } from '../common/dtos/filter.dto';

@Injectable()
export class UserTypesService {
  relations = ['company'];
  constructor(
    @InjectRepository(UserType) private userTypeRep: Repository<UserType>,
    private companyS: CompaniesService,
  ) {}

  async getInfoPageUserTypes(limit: number) {
    const length = await this.userTypeRep.count();
    return {
      length,
      pages: Math.ceil(length / limit),
    };
  }

  async getUserTypes(getInactive = true, filters?: FilterDto) {
    const { page = 1, limit = 5, offset = 0 } = filters;
    const skip = filters.page ? (page - 1) * limit : offset;

    return getInactive
      ? await this.userTypeRep.find({
          relations: this.relations,
          take: limit,
          skip,
        })
      : await this.userTypeRep.find({
          relations: this.relations,
          where: { isActive: true },
          take: limit,
          skip,
        });
  }

  async getSingleUserType(id: number, getInactive = true) {
    const userType = getInactive
      ? await this.userTypeRep.findOne(id, { relations: this.relations })
      : await this.userTypeRep.findOne(id, {
          relations: this.relations,
          where: { isActive: true },
        });
    if (!userType) throw new NotFoundException('Could not find user type');

    return userType;
  }

  async createUserType(payload: createUserTypeDto) {
    const newUserType = this.userTypeRep.create(payload);

    if (!newUserType) {
      throw new BadRequestException('Could not create user type');
    }
    if (payload.companyId) {
      const company = await this.companyS.getSingleCompany(payload.companyId);
      newUserType.company = company;
    }

    return await this.userTypeRep.save(newUserType);
  }

  async updateUserType(id: number, payload: updateUserTypeDto) {
    const userType = await this.getSingleUserType(id, false);
    if (payload.companyId) {
      const company = await this.companyS.getSingleCompany(payload.companyId);
      userType.company = company;
    }
    this.userTypeRep.merge(userType, payload);

    return await this.userTypeRep.save(userType);
  }

  async inactiveUserType(id: number) {
    const userType = await this.getSingleUserType(id);
    this.userTypeRep.merge(userType, { isActive: false });

    return await this.userTypeRep.save(userType);
  }

  async activeUserType(id: number) {
    const userType = await this.getSingleUserType(id);
    this.userTypeRep.merge(userType, { isActive: true });

    return await this.userTypeRep.save(userType);
  }
}
