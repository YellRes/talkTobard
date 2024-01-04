import { Controller, Get, Req, Post } from '@nestjs/common';
import { Request } from 'express';
import { LoginService } from './login.service';

@Controller('user')
export class UserController {
  constructor(private loginService: LoginService) {}

  @Get('login')
  login(@Req() request: Request): string {
    return 'login success';
  }

  @Post('register')
  register(@Req() request: Request): string {
    return 'register success';
  }
}
