import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EntitiesService } from './entities.service';
import { EntitiesController } from './entities.controller';
import { Entities } from './entities/entity.entity';
import { CrnEntities } from './entities/crn-entity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entities, CrnEntities])],
  controllers: [EntitiesController],
  providers: [EntitiesService],
})
export class EntitiesModule {}
