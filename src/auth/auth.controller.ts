import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { FirebaseAuthGuard } from './guard/firebase.guard';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from './guard/Role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('auth')
@ApiTags('Auth API')
@UseGuards(FirebaseAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  async SignUp(@Req() req) {
    return await this.authService.auth(req.user);
  }
  
  @Post('test')
  @Roles('user')
  async test(@Req() req) {
    return req.user;
  }

}
