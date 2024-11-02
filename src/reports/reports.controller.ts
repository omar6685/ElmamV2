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

import { ReportsService } from './reports.service';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { ZodValidationPipe } from 'src/shared/pipes/zod.pipe';
import { RolesEnum } from 'src/shared/enums/role.enum';
import {
  CreateNationalityReportDto,
  createNationalityReportSchema,
} from './dto/nationality-reports/create.dto';
import {
  UpdateNationalityReportDto,
  updateNationalityReportSchema,
} from './dto/nationality-reports/update.dto';
import { RolesGuard } from 'src/shared/guards/roles.guard';

@Controller('reports')
@UseGuards(RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('nationality')
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  @UsePipes(new ZodValidationPipe(createNationalityReportSchema))
  create(@Body() createNationalityReportDto: CreateNationalityReportDto) {
    console.log(createNationalityReportDto);
    return this.reportsService.create(createNationalityReportDto);
  }

  @Get('nationality')
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  findAll() {
    return this.reportsService.findAll();
  }

  @Get('nationality/:id')
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }

  @Patch('nationality/:id')
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  @UsePipes(new ZodValidationPipe(updateNationalityReportSchema))
  update(
    @Param('id') id: string,
    @Body() updateNationalityReportDto: UpdateNationalityReportDto,
  ) {
    console.log('id:', id);
    console.log('body:', updateNationalityReportDto);
    return this.reportsService.update(+id, updateNationalityReportDto);
  }

  @Delete('nationality/:id')
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER, RolesEnum.TECHNICAL)
  remove(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }
}
