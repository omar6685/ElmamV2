import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { NationalityReport } from './entities/nationality-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NationalityReport])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
