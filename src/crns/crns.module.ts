import { Module } from '@nestjs/common';
import { CrnsService } from './crns.service';
import { CrnsController } from './crns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommercialRegistrationNumber } from './entities/crn.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([CommercialRegistrationNumber]),
  ],
  controllers: [CrnsController],
  providers: [CrnsService],
})
export class CrnsModule {}
