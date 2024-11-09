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
  Query,
} from '@nestjs/common';

import { EntitiesService } from './entities.service';
import { CreateEntityDto, createEntitySchema } from './dto/create-entity.dto';
import { UpdateEntityDto, updateEntitySchema } from './dto/update-entity.dto';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { ZodValidationPipe } from 'src/shared/pipes/zod.pipe';
import { RolesEnum } from 'src/shared/enums/role.enum';
import {
  CreateCrnEntityDto,
  createCrnEntitySchema,
} from './dto/create-crn-entity.dto';

@Controller('entities')
@UseGuards(RolesGuard)
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  @UsePipes(new ZodValidationPipe(createEntitySchema))
  create(@Body() createEntityDto: CreateEntityDto) {
    return this.entitiesService.create(createEntityDto);
  }

  @Post('crn-entity')
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  @UsePipes(new ZodValidationPipe(createCrnEntitySchema))
  createCrnEntity(@Body() createCrnEntityDto: CreateCrnEntityDto) {
    return this.entitiesService.createCrnEntity(createCrnEntityDto);
  }

  @Get()
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  findAll() {
    return this.entitiesService.findAll();
  }

  @Get('crn-entity')
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  findAllCrnEntities(@Query('entityId') entityId: string) {
    return this.entitiesService.findAllCrnEntities(entityId);
  }

  @Get(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  findOne(@Param('id') id: string) {
    return this.entitiesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  @UsePipes(new ZodValidationPipe(updateEntitySchema))
  update(@Param('id') id: string, @Body() updateEntityDto: UpdateEntityDto) {
    return this.entitiesService.update(+id, updateEntityDto);
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  remove(@Param('id') id: string) {
    return this.entitiesService.remove(+id);
  }
}
