import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { PrismaService } from '../../prisma.service'
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [PageController],
  providers: [PageService, PrismaService, {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  }],
})
export class PageModule {}
