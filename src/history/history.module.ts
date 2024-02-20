import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core'
import { HistoryController } from './history.controller'
import { HistoryService } from './history.service'
import { PrismaService } from '../prisma.service'

@Module({
    controllers: [HistoryController],
    providers: [
        HistoryService,
        PrismaService,
        {
            provide: APP_PIPE,
            useClass: ValidationPipe
        }
    ]
})
export class HistoryModule {}
