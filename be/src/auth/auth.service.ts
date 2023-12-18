import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private authService: PrismaService,
    private jwt: JwtService,
  ) {}
  async signIn(dto: AuthDto) {
    const user = await this.authService.user.findFirst({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException('Email or password is incorrect');
    if (user.password !== dto.password)
      throw new ForbiddenException('Email or password is incorrect');

    delete dto.password;
    delete user.password;

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ accessToken: string }> {
    const token = await this.jwt.signAsync(
      { sub: userId, email },
      { expiresIn: '2m', secret: 'secret' },
    );
    return { accessToken: token };
  }
}
