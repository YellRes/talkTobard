import { Controller, Get, Post, Query, Body, UseGuards } from '@nestjs/common'
import { HistoryService } from './history.service'
import { HistoryDto } from './dto/history.dto'
import { LoginGuard } from '../login.guard'

@Controller('history/')
export class HistoryController {
    constructor(
        private readonly historyService: HistoryService
    ) { }
    
    @Get('getHistoryByUserId')
    @UseGuards(LoginGuard)
    async getHistoryByUserId(@Query('userId') userId: number) {
        return await this.historyService.getHistoryByUserId(+userId)
    }

    @Post('createHistory')
    @UseGuards(LoginGuard)
    async createHistory(@Body() historyData: HistoryDto) {
        return await this.historyService.createHistory(historyData)
    }

    @Post('updateHistory')
    @UseGuards(LoginGuard)
    async updateHistory(@Body() historyData: HistoryDto) {
        return await this.historyService.updateHistory(historyData)
    }
}