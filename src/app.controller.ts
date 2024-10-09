import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import {
  CreateCatDto,
  UpdateCatDto,
  ListAllEntities,
} from './dto/create-cat.dto';
import { Response } from 'express';

@Controller('cats')
export class AppController {
  @Post()
  create(@Res() res: Response, @Body() createCatDto: CreateCatDto) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() query: ListAllEntities,
  ) {
    // return `This action returns all cats (limit: ${query.limit} items)`;
    res.status(HttpStatus.OK).json([]);
    return []
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
