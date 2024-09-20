import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { Mongoose } from 'mongoose';
import { join } from 'path/posix';
import { secret } from './utils/constants';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema } from './model/user.schema';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test-DB'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
