import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ModulesService } from './modules.service';
import { createModuleDto, updateModuleDto } from './dto/module.dto';

@Controller()
export class ModulesController {
  constructor(private moduleS: ModulesService) {}

  @Get()
  async getModules() {
    const modules = await this.moduleS.getModules();
    return {
      modules,
    };
  }
  @Get(':id')
  async getModule(@Param('id', ParseIntPipe) id: number) {
    const module = await this.moduleS.getSingleModule(id);
    return {
      module,
    };
  }
  @Post()
  async postModule(@Body() payload: createModuleDto) {
    const newModule = await this.moduleS.createModule(payload);
    return {
      newModule,
    };
  }
  @Put(':id')
  async putModule(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: updateModuleDto,
  ) {
    const moduleUpdated = await this.moduleS.updateModule(payload, id);
    return {
      moduleUpdated,
    };
  }
  @Delete(':id')
  async inactivateModule(@Param('id', ParseIntPipe) id: number) {
    const deletedModule = await this.moduleS.inactivateModule(id);

    return {
      deletedModule,
    };
  }
  @Patch(':id')
  async activateModule(@Param('id', ParseIntPipe) id: number) {
    const activateModule = await this.moduleS.activateModule(id);

    return {
      activateModule,
    };
  }
}
