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
  Query,
} from '@nestjs/common';
import { UserTypesService } from './user-types.service';
import { createUserTypeDto, updateUserTypeDto } from './dtos/user-type.dto';
import { FilterDto } from '../common/dtos/filter.dto';

@Controller()
export class UserTypesController {
  constructor(private userTypeS: UserTypesService) {}
  @Get()
  async getUserTypes(@Query() filters: FilterDto) {
    const userTypes = await this.userTypeS.getUserTypes(false, filters);
    const info = await this.userTypeS.getInfoPageUserTypes(filters.limit || 5);
    return {
      userTypes,
      ...info,
    };
  }
  @Get(':id')
  async getUserType(@Param('id', ParseIntPipe) id: number) {
    const userType = await this.userTypeS.getSingleUserType(id);
    return {
      userType,
    };
  }
  @Post()
  async postUserType(@Body() payload: createUserTypeDto) {
    const newUserType = await this.userTypeS.createUserType(payload);
    return {
      newUserType,
    };
  }
  @Put(':id')
  async updateUserType(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: updateUserTypeDto,
  ) {
    const userTypeUpdated = await this.userTypeS.updateUserType(id, payload);
    return {
      userTypeUpdated,
    };
  }
  @Delete(':id')
  async deleteUserType(@Param('id', ParseIntPipe) id: number) {
    const userTypeDeleted = await this.userTypeS.inactiveUserType(id);
    return {
      userTypeDeleted,
    };
  }
  @Patch(':id')
  async activateUserType(@Param('id', ParseIntPipe) id: number) {
    const activatedUserType = await this.userTypeS.activeUserType(id);
    return {
      activatedUserType,
    };
  }
}
