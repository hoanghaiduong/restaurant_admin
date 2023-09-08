import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseAuthGuard } from './guard/firebase.guard';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, FirebaseService, FirebaseAuthGuard],
  exports: [AuthService]
})
export class AuthModule { }
