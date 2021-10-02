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
import { BrandsService } from './brands.service';
import { createBrandDto, UpdateBrandDto } from './dtos/brands.dto';

@Controller()
export class BrandsController {
  constructor(private brandsS: BrandsService) {}

  @Get()
  async getBrands() {
    const brands = await this.brandsS.getBrands();
    return {
      brands,
    };
  }

  @Get(':id')
  async getBrand(@Param('id', ParseIntPipe) id: number) {
    const brand = await this.brandsS.getSingleBrand(id);
    return {
      brand,
    };
  }

  @Post()
  async postBrand(@Body() payload: createBrandDto) {
    const newBrand = await this.brandsS.createBrand(payload);
    return {
      newBrand,
    };
  }

  @Put(':id')
  async putBrand(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    const brandUpdated = await this.brandsS.updatebrand(id, payload);

    return {
      brandUpdated,
    };
  }

  @Delete(':id')
  async deleteBrand(@Param('id', ParseIntPipe) id: number) {
    const deletedBrand = await this.brandsS.deleteBrand(id);

    return {
      deletedBrand,
    };
  }

  @Delete(':id/inactivate')
  async inactivateBrand(@Param('id', ParseIntPipe) id: number) {
    const inactivateBrand = await this.brandsS.inactivateBrand(id);

    return {
      inactivateBrand,
    };
  }

  @Patch(':id/activate')
  async activateBrand(@Param('id', ParseIntPipe) id: number) {
    const activateBrand = await this.brandsS.activateBrand(id);

    return {
      activateBrand,
    };
  }
}
