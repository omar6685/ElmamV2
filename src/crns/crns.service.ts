import { Injectable } from '@nestjs/common';
import { CreateCrnDto } from './dto/create-crn.dto';
import { UpdateCrnDto } from './dto/update-crn.dto';

@Injectable()
export class CrnsService {
  create(createCrnDto: CreateCrnDto) {
    return 'This action adds a new crn';
  }

  findAll() {
    return `This action returns all crns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crn`;
  }

  update(id: number, updateCrnDto: UpdateCrnDto) {
    return `This action updates a #${id} crn`;
  }

  remove(id: number) {
    return `This action removes a #${id} crn`;
  }
}
