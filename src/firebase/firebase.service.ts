import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin'
import * as path from 'path';
import { defaultAuth } from 'src/common/config/firebaseConfig';

@Injectable()
export class FirebaseService {

  
}
