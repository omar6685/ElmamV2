import { PartialType } from '@nestjs/swagger';
import { CreateCrnDto } from './create-crn.dto';

export class UpdateCrnDto extends PartialType(CreateCrnDto) {}
