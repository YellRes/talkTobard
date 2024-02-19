// user.dto.ts
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  password: string;

  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '请输入有效的邮箱地址' })
  email: string;
    

  gender: boolean
  age: number
}

export class EmailDto {
  @IsEmail({}, { message: '请输入有效的邮箱地址' })
  email: string;
}

export class LoginDto {
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsString({ message: '邮箱必须是字符串' })
  email: string

  @IsNotEmpty({ message: '邮箱不能为空' })
  password: string
}

export class updateUserDto {
  name: string;
  email: string;
  @IsNotEmpty({ message: 'id不能为空' })
  id: number;
}
