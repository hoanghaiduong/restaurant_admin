// src/auth/firebase.guard.ts

import { Injectable, CanActivate, ExecutionContext, ForbiddenException, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import * as admin from 'firebase-admin'
import { defaultAuth } from 'src/common/config/firebaseConfig';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private userService: UsersService) { }

    async verifyIdToken(token: string): Promise<admin.auth.DecodedIdToken> {


        const decodedToken = await defaultAuth.verifyIdToken(token);
        if (!decodedToken) {
            throw new ForbiddenException(`Authentication token invalid`)
        }
        return decodedToken;

    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        // if (!authHeader || !authHeader.startsWith('Bearer ')) {
        //     throw new ForbiddenException({
        //         message: 'Token is required'
        //     }); // No Bearer token found in the header
        // }

        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new BadRequestException("Missing token");
        }

        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
                context.getHandler(),
                context.getClass(),
            ]);
            if (!requiredRoles) {
                return true;
            }
            const decodedToken = await this.verifyIdToken(token);
            const uid = decodedToken.uid;
            request.user = decodedToken;
            request.uid = uid;
            const role = (await this.userService.findOne(uid)).role;
            console.log(role.name, requiredRoles, requiredRoles.includes(role.name));
            if (!requiredRoles.includes(role.name)) {
                throw new ForbiddenException('METHOD NOT ALLOWED')
            }
            return true;
        } catch (error) {
            throw new ForbiddenException({
                message: error.message,
            });
        }
    }
}
