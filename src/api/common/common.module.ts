import { Module } from '@nestjs/common';
import { AddressController } from './address/address.controller';
import { AddressService } from './address/address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address/entities/address.entity';
import { Company } from '../companies/entities/company.entity';
import { User } from '../users/entities/users.entity';

@Module({
  controllers: [AddressController],
  providers: [AddressService],
  imports: [TypeOrmModule.forFeature([Address, Company, User])],
  exports: [AddressService],
})
export class CommonModule {}
