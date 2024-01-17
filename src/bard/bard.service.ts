import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

import { CreateBardDto } from './dto/create-bard.dto';
import { UpdateBardDto } from './dto/update-bard.dto';

@Injectable()
export class BardService {
  constructor(private readonly httpService: HttpService) {}
  create(createBardDto: CreateBardDto) {
    return 'This action adds a new bard';
  }

  talk(content: string): Observable<AxiosResponse<any>> {
    return this.httpService.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCGXhcgB10pNS5pfGmCLHSlp1j06QzS1nI',
      {
        contents: [
          {
            parts: [
              {
                text: content,
              },
            ],
          },
        ],
      },
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} bard`;
  }

  update(id: number, updateBardDto: UpdateBardDto) {
    return `This action updates a #${id} bard`;
  }

  remove(id: number) {
    return `This action removes a #${id} bard`;
  }
}
