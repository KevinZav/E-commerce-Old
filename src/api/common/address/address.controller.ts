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
import { AddressService } from './address.service';
import { createAddressDto, updateAddressDto } from './dtos/address.dto';

@Controller('address')
export class AddressController {
  constructor(private addressS: AddressService) {}

  @Get(':id')
  async getAddress(@Param('id', ParseIntPipe) id: number) {
    const address = await this.addressS.getSingleAddress(id);

    return {
      address,
    };
  }

  @Post()
  async postAddress(@Body() payload: createAddressDto) {
    const newAddress = await this.addressS.createAddress(payload);

    return {
      newAddress,
    };
  }

  @Put(':id')
  async putAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: updateAddressDto,
  ) {
    const addressUpdated = await this.addressS.updateAddress(id, payload);

    return {
      addressUpdated,
    };
  }

  @Delete(':id')
  async deleteAddress(@Param('id', ParseIntPipe) id: number) {
    const deleteAddress = await this.addressS.inactivateAddress(id);

    return {
      deleteAddress,
    };
  }

  @Patch(':id')
  async activateAddress(@Param('id', ParseIntPipe) id: number) {
    const activatedAddress = await this.addressS.activateAddress(id);

    return {
      activatedAddress,
    };
  }
}
