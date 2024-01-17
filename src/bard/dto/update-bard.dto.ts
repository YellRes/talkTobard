import { PartialType } from '@nestjs/mapped-types';
import { CreateBardDto } from './create-bard.dto';

export class UpdateBardDto extends PartialType(CreateBardDto) {}
