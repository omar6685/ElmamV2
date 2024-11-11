import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { NationalityReport } from './entities/nationality-report.entity';
import { CrnEntities } from 'src/entities/entities/crn-entity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NationalityReport, CrnEntities])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
