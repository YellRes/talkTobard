// user.controller.ts
import { Controller, Res, Post, Get, Body, Query, Inject, UseGuards } from '@nestjs/common';
import { Response } from 'express'
import { JwtService } from '@nestjs/jwt'

import { CreateUserDto, EmailDto } from './user.dto';
import { UserService } from './user.service'
import { LoginGuard } from '../login.guard'

@Controller('user/')
export class UserController {
 
  constructor(
    private readonly userService: UserService,
  ) { }
  
  @Inject(JwtService)
  private jwtService: JwtService

  @Get('sendEmailCode')
  async sendEmailCode(@Query() emailDto: EmailDto) {
    return this.userService.sendEmailCode(emailDto.email);
  }

   @Get('verifyEmailCode')
  async verifyEmailCode(@Query('email') email: string, @Query('code') code: string) { 
    return this.userService.verifyEmailCode({ email, code });
  }

  // 创建用户
  @Post('createUser')
  async createUser(@Body() userData: CreateUserDto) { 
    const { email, password } = userData
    return await this.userService.createUser({
      password,
      email
    })
  }

  // 用户登录
  @Post('login')
  async login(
    @Body()
    userData: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { email, password } = userData;
    const findUser = await this.userService.login({
      password,
      email
    });

    if (findUser) {
      const { email, id } = findUser
      const token = await this.jwtService.signAsync({
        user: {
          email,
          id
        }
      })

      res.setHeader('authorization', 'bearer' + token)
      return '登录成功'
    } else {
      return '登录失败'
    }
  }

  // 获取用户信息
  @Get('getUserInfo')
  @UseGuards(LoginGuard)
  async getUserInfo() { 
    return 'getUserInfo'
  }
}