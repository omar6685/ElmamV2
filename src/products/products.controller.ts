import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  createProductSchema,
} from './dto/create-product.dto';
import {
  UpdateProductDto,
  updateProductSchema,
} from './dto/update-product.dto';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RolesEnum } from 'src/shared/enums/role.enum';
import { ZodValidationPipe } from 'src/shared/pipes/zod.pipe';

@Controller('products')
@UseGuards(RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  @UsePipes(new ZodValidationPipe(createProductSchema))
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  @UsePipes(new ZodValidationPipe(updateProductSchema))
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    console.log('id:', id);
    console.log('body:', updateProductDto);
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
