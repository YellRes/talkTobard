import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma.service';
import { BardModule } from './bard/bard.module';
import { UserModule } from './user/user.module'

@Module({
  imports: [BardModule, UserModule],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
