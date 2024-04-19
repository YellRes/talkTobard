import { IsNotEmpty } from 'class-validator';

export class CreatePageDto {
    @IsNotEmpty({message: '组件字段不能为空'})
    pageItem: JSON
    @IsNotEmpty({message: 'userId字段不能为空'})
    userId: number
 }
