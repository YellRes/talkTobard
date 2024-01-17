import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginService } from './user/login.service';
import { UserService } from './user.service';
import { UserController } from './user/login.controller';
import { PrismaService } from './prisma.service';
import { BardModule } from './bard/bard.module';

@Module({
  imports: [BardModule],
  controllers: [AppController, UserController],
  providers: [AppService, LoginService, UserService, PrismaService],
})
export class AppModule {}
