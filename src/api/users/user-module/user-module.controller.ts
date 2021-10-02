import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UserModuleService } from './user-module.service';
import { createUserModuleDto } from '../dtos/user-module.dto';

@Controller()
export class UserModuleController {
  constructor(private userModuleS: UserModuleService) {}

  @Get()
  async getUserModules() {
    const userModules = await this.userModuleS.getUserModules();
    return {
      userModules,
    };
  }
  @Post()
  async postUserModule(@Body() payload: createUserModuleDto) {
    const newuserModule = await this.userModuleS.createUserModule(payload);
    return {
      newuserModule,
    };
  }
  @Delete(':id')
  async inactivateUserModule(@Param('id', ParseIntPipe) id: number) {
    const deletedUserModule = await this.userModuleS.inactivateUserModule(id);
    return {
      deletedUserModule,
    };
  }
  @Patch(':id')
  async activateUserModule(@Param('id', ParseIntPipe) id: number) {
    const activatedUserModule = await this.userModuleS.activateUserModule(id);
    return {
      activatedUserModule,
    };
  }
}
