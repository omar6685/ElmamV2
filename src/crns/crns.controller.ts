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

import { CrnsService } from './crns.service';
import {
  CreateCommercialRegistrationDto,
  createCommercialRegistrationSchema,
  updateCommercialRegistrationSchema,
} from './dto/create-crn.dto';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { ZodValidationPipe } from 'src/shared/pipes/zod.pipe';
import { RolesEnum } from 'src/shared/enums/role.enum';
import { UpdateCommercialRegistrationDto } from './dto/update-crn.dto';

@Controller('crns')
@UseGuards(RolesGuard)
export class CrnsController {
  constructor(private readonly crnsService: CrnsService) {}

  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  @UsePipes(new ZodValidationPipe(createCommercialRegistrationSchema))
  create(@Body() createCrnDto: CreateCommercialRegistrationDto) {
    return this.crnsService.create(createCrnDto);
  }

  @Get()
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  findAll() {
    return this.crnsService.findAll();
  }

  @Get(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  findOne(@Param('id') id: string) {
    return this.crnsService.findOne(+id);
  }


  @Patch(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  @UsePipes(new ZodValidationPipe(updateCommercialRegistrationSchema))
  update(@Param('id') id: string, @Body() updateProductDto: UpdateCommercialRegistrationDto) {
    return this.crnsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  remove(@Param('id') id: string) {
    return this.crnsService.remove(+id);
  }
}
