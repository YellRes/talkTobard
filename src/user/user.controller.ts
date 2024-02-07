// user.controller.ts
import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { CreateUserDto, EmailDto } from './user.dto';
import { UserService } from './user.service'

@Controller('user')
export class UserController {
 
    constructor(
        private readonly userService: UserService,
    ) { }

  @Get('/sendEmailCode')
  async sendEmailCode(@Query() emailDto: EmailDto) {
    return this.userService.sendEmailCode(emailDto.email);
  }

   @Get('/verifyEmailCode')
  async verifyEmailCode(@Query('email') email: string, @Query('code') code: string) { 
    return this.userService.verifyEmailCode({ email, code });
  }

    // 创建用户
  @Post('user/createUser')
  async createUser(
    @Body()
    userData: CreateUserDto,
  ) {
    const { email, password } = userData;
    return this.userService.createUser({
      password,
      email
    });
  }


}