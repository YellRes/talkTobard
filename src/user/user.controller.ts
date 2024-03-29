// user.controller.ts
import { Controller, Res, Post, Get, Body, Query, Inject, UseGuards } from '@nestjs/common';
import { Response } from 'express'
import { JwtService } from '@nestjs/jwt'

import { CreateUserDto, EmailDto, updateUserDto } from './user.dto';
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
      return findUser
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

  // 查询所有用户
  @Get('getAllUser')
  async getAllUser() { 
    return await this.userService.getAllUser()
  }

  // 更新用户信息
  @Post('updateUser')
  @UseGuards(LoginGuard)
  async updateUser(@Body() userData: updateUserDto) { 
    const { email, name, id } = userData
    return await this.userService.updateUser({
      data: {
        email,
        name
      },
      where: {
        id
      }
    })
  }
}