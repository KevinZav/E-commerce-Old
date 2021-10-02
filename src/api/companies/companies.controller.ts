import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { createCompanyDto, updateCompanyDto } from './dtos/company.dto';

@Controller()
export class CompaniesController {
  constructor(private companyS: CompaniesService) {}
  @Get()
  async getCompanies() {
    const companies = await this.companyS.getCompanies();
    return {
      companies,
    };
  }

  @Get(':id')
  async getCompany(@Param('id', ParseIntPipe) id: number) {
    const company = await this.companyS.getSingleCompany(id);

    return {
      company,
    };
  }

  @Post()
  async postCompany(@Body() payload: createCompanyDto) {
    const newCompany = await this.companyS.createCompany(payload);

    return {
      newCompany,
    };
  }

  @Put(':id')
  async putCompany(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: updateCompanyDto,
  ) {
    const companyUpdated = await this.companyS.updateCompany(id, payload);
    return {
      companyUpdated,
    };
  }

  @Delete(':id')
  async deleteCompany(@Param('id') id: number) {
    const deletedCompany = await this.companyS.inactivateCompany(id);

    return {
      deletedCompany,
    };
  }

  @Patch(':id')
  async activateCompany(@Param('id') id: number) {
    const activatedCompany = await this.companyS.activateCompany(id);

    return {
      activatedCompany,
    };
  }
  @Delete(':id/module/:idModule')
  async deleteModule(
    @Param('id', ParseIntPipe) idCompany: number,
    @Param('idModule', ParseIntPipe) idModule: number,
  ) {
    const companyUpdate = await this.companyS.removeModuleCompany(
      idCompany,
      idModule,
    );
    return {
      companyUpdate,
    };
  }
  @Patch(':id/module/:idModule')
  async addModule(
    @Param('id', ParseIntPipe) idCompany: number,
    @Param('idModule', ParseIntPipe) idModule: number,
  ) {
    const companyUpdate = await this.companyS.addModuleCompany(
      idCompany,
      idModule,
    );
    return {
      companyUpdate,
    };
  }
}
