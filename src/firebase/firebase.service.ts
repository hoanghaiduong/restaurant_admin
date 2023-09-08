import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin'
import { ApiException } from 'src/common/exception/api.exception';
@Injectable()
export class FirebaseService {
    private admin: admin.app.App;

    constructor(private configService: ConfigService) {
    }
    
    async getAdminInstance(): Promise<admin.app.App> {
        if (!this.admin) {
            const adminConfig: admin.ServiceAccount = {
                projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
                privateKey: this.configService.get<string>('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
                clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
            };

            this.admin = admin.initializeApp({
                credential: admin.credential.cert(adminConfig),
            });
        }

        return this.admin;
    }
    async verifyIdToken(token: string): Promise<admin.auth.DecodedIdToken> {

        const adminInstance = await this.getAdminInstance();
        const decodedToken = adminInstance.auth().verifyIdToken(token);
        if (!decodedToken) {
            throw new ForbiddenException(`Authentication token invalid`)
        }
        return decodedToken;

    }
}
