import { Controller, Get, Post, Body, Patch, Query, Delete, UseGuards, Param } from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { LoginGuard } from '../../login.guard'

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
    @UseGuards(LoginGuard)
  create(@Body() createPageDto: CreatePageDto) {
    console.log(createPageDto, 'createPageDto')
    return this.pageService.create(createPageDto);
  }

  @Get()
  @UseGuards(LoginGuard)
  findAll(@Query('userId') userId: string) {
    return this.pageService.findAll(+userId);
  }

  @Get(':id')
  @UseGuards(LoginGuard)
  findOne(@Param('id') id: string, @Query('userId') userId: string) {
    return this.pageService.findOne(+id, +userId);
  }

  @Patch(':id')
  @UseGuards(LoginGuard)
  update(@Query('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pageService.update(+id, updatePageDto);
  }

  @Delete(':id')
  @UseGuards(LoginGuard)
  remove(@Query('id') id: string) {
    return this.pageService.remove(+id);
  }
}
