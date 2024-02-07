import { Controller, Get, Param, Post, Body, Delete, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { Prisma, User as UserModel } from '@prisma/client';
import email from '../config/email';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}



  @Post('user/getUsers')
  async getUsers(
    @Body()
    searchInfo: {
      email: string;
    },
  ){
    // const { email } = searchInfo;
    // return this.userService.users();
  }

  // // 发送邮件验证码
  // @Get('user/sendEmailCode')
  // async sendEmailCode(
  //   @Query('email')
  //   email: string
  // ) {
  //   return this.userService.sendEmailCode(email);
  // }

  // // 验证邮箱验证码
  // @Get('user/verifyEmailCode')
  // async verifyEmailCode(@Query('email') email: string, @Query('code') code: string) { 
  //   return this.userService.verifyEmailCode({ email, code });
  // }

  // // 创建用户
  // @Post('user/createUser')
  // async createUser(
  //   @Body()
  //   userData: {
  //     name?: string;
  //     age?: number;
  //     gender?: boolean;
  //     email: string;
  //   },
  // ): Promise<UserModel> {
  //   const { name, age, gender, email } = userData;
  //   return this.userService.createUser({
  //     name,
  //     age,
  //     gender,
  //     email,
  //   });
  // }

  // // 删除用户
  // @Delete('user/:id')
  // async deletePost(@Param('id') id: string): Promise<UserModel> {
  //   return this.userService.deleteUser({ id: Number(id) });
  // }


  // @Get('user/:id')
  // async getUserById(@Param('id') id: string): Promise<UserModel> {
  //   return this.userService.user({ id: Number(id) });
  // }
}
