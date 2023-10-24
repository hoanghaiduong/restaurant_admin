import { Injectable } from '@nestjs/common';
import { RolesService } from 'src/roles/roles.service';

import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly roleService: RolesService
  ) { }
  async auth(req: any) {
    const uid = req?.uid;
    let user = await this.usersService.findOneUserExists(uid);
    const role = await this.roleService.findOneByName('user');
    if (!user) {
      user = await this.usersService.create({
        photoURL: req?.picture,
        emailVerified: req?.email_verified,
        email: req?.email,
        uid: req?.uid,
        firebase: req?.firebase,
        displayName: req?.name,
        role
      });
    }
    return user;
  }



}
