import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from './model/user.schema';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { secret } from './utils/constants';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/test-DB'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
