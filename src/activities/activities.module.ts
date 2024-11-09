import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { ActivityTables } from './entities/activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityTables])],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
})
export class ActivitiesModule {}
