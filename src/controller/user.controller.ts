import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signup(@Res() response, @Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.signup(createUserDto);
    return response.status(HttpStatus.CREATED).json(newUser);
  }

  @Post('/signin')
  async signin(@Res() response, @Body() createUserDto: CreateUserDto) {
    const token = await this.userService.signin(createUserDto);
    return response.status(HttpStatus.OK).json(token);
  }
}
