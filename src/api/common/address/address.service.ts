import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { createAddressDto, updateAddressDto } from './dtos/address.dto';
import { Company } from '../../companies/entities/company.entity';
import { User } from 'src/api/users/entities/users.entity';

@Injectable()
export class AddressService {
  relations = ['company'];
  constructor(
    @InjectRepository(Address) private addressRep: Repository<Address>,
    @InjectRepository(Company) private companyRep: Repository<Company>,
    @InjectRepository(User) private userRep: Repository<User>,
  ) {}

  async getSingleAddress(id: number, getInactive = true) {
    const address = getInactive
      ? await this.addressRep.findOne(id)
      : await this.addressRep.findOne(id, {
          where: { isActive: true },
        });
    if (!address) throw new NotFoundException('Could not be find address');

    return address;
  }

  async createAddress(payload: createAddressDto) {
    const newAddress = this.addressRep.create(payload);
    if (payload.companyId) {
      const company = await this.companyRep.findOne(payload.companyId);
      if (!company) throw new NotFoundException('Could not be find company');
      newAddress.company = company;
    } else if (payload.userId) {
      const user = await this.userRep.findOne(payload.userId);
      if (!user) throw new NotFoundException('Could not be find user');
      newAddress.user = user;
    }
    if (!newAddress)
      throw new BadRequestException('Could not be created company');

    return await this.addressRep.save(newAddress);
  }

  async updateAddress(id: number, payload: updateAddressDto) {
    const address = await this.getSingleAddress(id, false);

    const { companyId, userId, ...data } = payload;

    this.addressRep.merge(address, data);

    return await this.addressRep.save(address);
  }

  async inactivateAddress(id: number) {
    const address = await this.getSingleAddress(id);
    this.addressRep.merge(address, { isActive: false });

    return await this.addressRep.save(address);
  }

  async activateAddress(id: number) {
    const address = await this.getSingleAddress(id);
    this.addressRep.merge(address, { isActive: true });

    return await this.addressRep.save(address);
  }
}
