import { Body, Controller, Post, Response } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(@Body() dto: AuthDto, @Response() res) {
    return this.authService.signIn(dto, res);
  }
}
