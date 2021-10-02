import { Module } from '@nestjs/common';
import { UserTypesService } from './user-types.service';
import { UserTypesController } from './user-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserType } from './entities/user-types.entity';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserType]), CompaniesModule],
  providers: [UserTypesService],
  controllers: [UserTypesController],
})
export class UserTypesModule {}
