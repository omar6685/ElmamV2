import { Module } from '@nestjs/common';
import { CrnsService } from './crns.service';
import { CrnsController } from './crns.controller';

@Module({
  controllers: [CrnsController],
  providers: [CrnsService],
})
export class CrnsModule {}
