import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { Email } from '../../tools/email'
import * as crypto from 'crypto'

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
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const { email } = data
    const findUser = await this.prisma.user.findUnique({
      where: {
        email
      } 
    })
    return this.prisma.user.create({ data });
  }
}
