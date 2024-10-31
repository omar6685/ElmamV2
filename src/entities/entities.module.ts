import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EntitiesService } from './entities.service';
import { EntitiesController } from './entities.controller';
import { Entities } from './entities/entity.entity';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([Entities]),
  ],
  controllers: [EntitiesController],
  providers: [EntitiesService],
})
export class EntitiesModule {}
