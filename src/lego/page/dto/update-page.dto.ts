import { PartialType } from '@nestjs/mapped-types';
import { CreatePageDto } from './create-page.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdatePageDto extends PartialType(CreatePageDto) {
    @IsNotEmpty({message: 'id项必填'})
    id: string

    @IsNotEmpty({message: 'pageItem项必填'})
    pageItem: JSON

    @IsNotEmpty({message: 'userId项必填'})
    userId: number;
}
