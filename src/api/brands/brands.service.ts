import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from './entities/brands.entity';
import { createBrandDto, UpdateBrandDto } from './dtos/brands.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRep: Repository<Brand>) {}

  async getBrands(getInactive = true) {
    return getInactive
      ? await this.brandRep.find()
      : await this.brandRep.find({ isActive: true });
  }

  async getSingleBrand(id: number, getInactive = true) {
    const brand = getInactive
      ? await this.brandRep.findOne(id)
      : await this.brandRep.findOne(id, { where: { isActive: true } });
    if (!brand) throw new NotFoundException(`Could not find brand`);

    return brand;
  }

  async createBrand(payload: createBrandDto) {
    const newBrand = this.brandRep.create(payload);
    if (!newBrand) throw new BadRequestException('Could not create brand');

    return await this.brandRep.save(newBrand);
  }

  async updatebrand(id: number, payload: UpdateBrandDto) {
    const brand = await this.getSingleBrand(id, false);
    this.brandRep.merge(brand, payload);

    return await this.brandRep.save(brand);
  }

  async deleteBrand(id: number) {
    const brandDeleted = await this.brandRep.delete(id);

    return brandDeleted;
  }

  async inactivateBrand(id: number) {
    const brand = await this.getSingleBrand(id);
    this.brandRep.merge(brand, { isActive: false });

    return await this.brandRep.save(brand);
  }

  async activateBrand(id: number) {
    const brand = await this.getSingleBrand(id);
    this.brandRep.merge(brand, { isActive: true });

    return await this.brandRep.save(brand);
  }
}
