import { Injectable } from '@nestjs/common';
import { Page } from '@prisma/client'
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PrismaService } from '../../prisma.service'

@Injectable()
export class PageService {
  constructor(private prisma: PrismaService) { }

  async create(createPageDto: CreatePageDto) {
    try { 
      await this.prisma.page.create( {data: createPageDto as any} );
    } catch (e) {
      console.log(e)
    }
    
    return '创建成功'
  }

  findAll(userId: number) {
    return this.prisma.page.findMany();
  }

  findOne(id: number, userId: number) {
    return this.prisma.page.findFirst({where: {id, userId}});
  }

  update(id: number, updatePageDto: UpdatePageDto) {
    this.prisma.page.update({where: {id}, data: updatePageDto as any});
    return '删除成功'
  }

  remove(id: number) {
    this.prisma.page.delete({where: {id}});
    return '删除成功'
  }
}
