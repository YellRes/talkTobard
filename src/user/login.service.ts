import { Injectable } from '@nestjs/common';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class LoginService {
  private readonly Users: IUser[] = [];

  create(userInfo: IUser) {}
}
