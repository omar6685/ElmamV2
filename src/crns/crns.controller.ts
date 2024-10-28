import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CrnsService } from './crns.service';
import { CreateCrnDto } from './dto/create-crn.dto';
import { UpdateCrnDto } from './dto/update-crn.dto';

@Controller('crns')
export class CrnsController {
  constructor(private readonly crnsService: CrnsService) {}

  @Post()
  create(@Body() createCrnDto: CreateCrnDto) {
    return this.crnsService.create(createCrnDto);
  }

  @Get()
  findAll() {
    return this.crnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crnsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrnDto: UpdateCrnDto) {
    return this.crnsService.update(+id, updateCrnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crnsService.remove(+id);
  }
}
