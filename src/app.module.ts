import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './common/config/validation.config';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { CategoryModule } from './category/category.module';
import { CategoryDetailsModule } from './category-details/category-details.module';
import { CategoryTypeModule } from './category-type/category-type.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      envFilePath: [`.env`, `.env.${process.env.NODE_ENV}`], // load env
    }),
    DatabaseModule,
    FirebaseModule,
    AuthModule,
    UsersModule,
    RolesModule,
    CategoryModule,
    CategoryDetailsModule,
    CategoryTypeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
