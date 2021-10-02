import { RouterModule, Routes } from '@nestjs/core';
import { ApiModule } from './api.module';
import { BrandsModule } from './brands/brands.module';
import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { CommonModule } from './common/common.module';
import { UserTypesModule } from './user-types/user-types.module';
import { ModulesModule } from './modules/modules.module';
import { UsersModule } from './users/users.module';
import { UserModuleModule } from './users/user-module/user-module.module';

export const apiRoutes: Routes = [
  {
    path: 'api',
    module: ApiModule,
    children: [
      {
        path: 'brands',
        module: BrandsModule,
      },
      {
        path: 'companies',
        module: CompaniesModule,
      },
      {
        path: 'common',
        module: CommonModule,
      },
      {
        path: 'user-types',
        module: UserTypesModule,
      },
      {
        path: 'modules',
        module: ModulesModule,
      },
      {
        path: 'users',
        module: UsersModule,
      },
      {
        path: 'user-module',
        module: UserModuleModule,
      },
    ],
  },
];

@Module({
  imports: [RouterModule.register(apiRoutes)],
})
export class ApiRouterModule {}
