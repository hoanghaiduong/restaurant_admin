import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
    private firebaseService: FirebaseService) { }
  async auth(req: any) {
    const uid = req?.uid;
    let user = await this.usersService.findOneUserExists(uid);

    if (!user) {
      user = await this.usersService.create({
        photoURL: req?.picture,
        emailVerified: req?.email_verified,
        email: req?.email,
        uid: req?.uid,
        firebase: req?.firebase,
        displayName: req?.name,
      });
    }

    return user;
  }



}
