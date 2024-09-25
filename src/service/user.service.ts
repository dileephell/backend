import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../model/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hash,
    });
    return newUser.save();
  }

  async signin(createUserDto: CreateUserDto): Promise<any> {
    const foundUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
    if (!foundUser) {
      throw new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(createUserDto.password, foundUser.password);
    if (!isPasswordValid) {
      throw new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED);
    }

    const payload = { email: createUserDto.email };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async getOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }
}
