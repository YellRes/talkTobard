import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto'
import { User, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';
import { Email } from '../../tools/email'
import { CreateUserDto } from './user.dto'

function md5(str) {
  const hash = crypto.createHash('md5')
  hash.update(str)
  return hash.digest('hex')
}

@Injectable()
export class UserService {
  private emailCommon: Email
  constructor(private prisma: PrismaService) {
    this.emailCommon = new Email()
  }

  async user(userId: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userId,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({ skip, take, cursor, where, orderBy });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }


  // 发送邮件验证码
  async sendEmailCode(email: string) {
   await this.emailCommon.send({
      email,
      subject: '验证码',
    })
  }

  // 邮件验证码验证
  async verifyEmailCode({ email, code}) { 
    return this.emailCommon.verify({
      email, code
    })
  }

  // 创建用户
  async createUser(data: Prisma.UserCreateInput){
    const { email, password } = data
    const findUser = await this.prisma.user.findFirst({
      where: {
        email
      } 
    })
    if (findUser) { 
      throw new BadRequestException('用户已存在')
    }

    const user = new CreateUserDto()
    user.password = md5(password)
    user.email = email
 
    this.prisma.user.create({
      data: user
    });
  }

  // 用户登录
  async login(data: Prisma.UserCreateInput): Promise<User> { 
    const { email, password } = data

    const findUser = await this.prisma.user.findFirst({
      where: {
        email
      }
    })
    if (!findUser) { 
      throw new BadRequestException('用户不存在')
    }
    if (findUser.password !== md5(password)) { 
      throw new BadRequestException('密码错误')
    }

    return findUser
  }
}
