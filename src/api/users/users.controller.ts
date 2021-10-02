import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto, updateUserDto } from './dtos/user.dto';

@Controller()
export class UsersController {
  constructor(private userS: UsersService) {}

  @Get()
  async getUsers() {
    const users = await this.userS.getUsers();
    return {
      users,
    };
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userS.getSingleUser(id);
    return {
      user,
    };
  }

  @Post()
  async postUser(@Body() payload: createUserDto) {
    const newUser = await this.userS.createUser(payload);
    return {
      newUser,
    };
  }

  @Put(':id')
  async updateUser(
    @Body() payload: updateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const user = await this.userS.updateUser(id, payload);
    return {
      user,
    };
  }

  @Delete(':id')
  async inactivateUser(@Param('id', ParseIntPipe) id: number) {
    const deletedUser = await this.userS.inactivateUser(id);
    return {
      deletedUser,
    };
  }

  @Patch(':id')
  async activateUser(@Param('id', ParseIntPipe) id: number) {
    const activatedUser = await this.userS.activateUser(id);
    return {
      activatedUser,
    };
  }
}
