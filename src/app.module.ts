import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma.service';
import { BardModule } from './bard/bard.module';
import { UserModule } from './user/user.module'
import { HistoryModule } from './history/history.module';

@Module({
  imports: [BardModule, UserModule,
    JwtModule.register({
      global: true,
      secret: 'kkk',
      signOptions: {
        expiresIn: '7d'
      }
    }),
    HistoryModule
  ],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
