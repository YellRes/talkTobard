import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BardService } from './bard.service';
import { CreateBardDto } from './dto/create-bard.dto';
import { UpdateBardDto } from './dto/update-bard.dto';

@Controller('bard')
export class BardController {
  constructor(private readonly bardService: BardService) {}

  @Post()
  create(@Body() createBardDto: CreateBardDto) {
    return this.bardService.create(createBardDto);
  }

  @Get()
  findAll() {
    return this.bardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBardDto: UpdateBardDto) {
    return this.bardService.update(+id, updateBardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bardService.remove(+id);
  }
}
