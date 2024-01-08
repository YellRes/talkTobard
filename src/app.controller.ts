import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { Prisma, User as UserModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get('user/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }

  @Post('user/getUsers')
  async getUsers(
    @Body()
    searchInfo: {
      email: string;
    },
  ): Promise<UserModel[]> {
    const { email } = searchInfo;
    return this.userService.users({
      where: email
        ? {
            email,
          }
        : {},
    });
  }

  // 创建用户
  @Post('user/createUser')
  async createUser(
    @Body()
    userData: {
      name?: string;
      age?: number;
      gender?: boolean;
      email: string;
    },
  ): Promise<UserModel> {
    const { name, age, gender, email } = userData;
    return this.userService.createUser({
      name,
      age,
      gender,
      email,
    });
  }

  // 删除用户
  @Delete('user/:id')
  async deletePost(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
