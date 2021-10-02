import { Module } from '@nestjs/common';
import { BrandsModule } from './brands/brands.module';
import { ApiRouterModule } from './api.routes';
import { CompaniesModule } from './companies/companies.module';
import { CommonModule } from './common/common.module';
import { UserTypesModule } from './user-types/user-types.module';
import { ModulesModule } from './modules/modules.module';
import { UsersModule } from './users/users.module';
import { UserModuleModule } from './users/user-module/user-module.module';

@Module({
  imports: [
    ApiRouterModule,
    BrandsModule,
    CompaniesModule,
    CommonModule,
    UserTypesModule,
    ModulesModule,
    UsersModule,
    UserModuleModule,
  ],
})
export class ApiModule {}
