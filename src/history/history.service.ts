import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { HistoryDto } from './dto/history.dto'

@Injectable()
export class HistoryService {
    constructor(private prisma: PrismaService) {}

    // 查询所有的用户信息
    async getHistoryByUserId(userId: number) {
        try { 
            return await this.prisma.history.findMany({
                where: {
                    userId
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    // 创建history
    async createHistory(historyData: HistoryDto) { 
        try {
            await this.prisma.history.create({
                data: {
                    userId: historyData.userId,
                    title: historyData.title
                },
            })

            await Promise.all(historyData.contents.map(async content => { 
                await this.prisma.historyItem.create({
                    data: {
                        historyId: historyData.id,
                        ...content
                    }
                })
            }))
        } catch (e) {
            console.log(e)
        }
    }

    // 更新history
    async updateHistory(historyData: HistoryDto) { 
        try {
            await this.prisma.history.update({
                data: {
                    userId: historyData.userId,
                    title: historyData.title
                },
                where: {
                    id: historyData.id
                }
            })

            await Promise.all(historyData.contents.map(async content => { 
                await this.prisma.historyItem.create({
                    data: {
                        historyId: historyData.id,
                        ...content
                    }
                })
            }))

        } catch (e) { 
            console.log(e)
        }
    }
}