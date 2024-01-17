import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BardService } from './bard.service';
import { BardController } from './bard.controller';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ],
  controllers: [BardController],
  providers: [BardService],
})
export class BardModule {}
