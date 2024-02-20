import { IsNotEmpty } from 'class-validator'

export class HistoryDto {
    id: number;
    @IsNotEmpty({ message: '历史内容不能为空'})
    title: string;
    @IsNotEmpty({ message: '用户id不能为空'})
    userId: number;
    contents: Array<{
        role: 'user' | 'model',
        parts: string
    }>
}