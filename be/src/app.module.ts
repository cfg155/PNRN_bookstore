import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { BookModule } from './books/book.module';

@Module({
  imports: [AuthModule, UserModule, BookModule, PrismaModule],
})
export class AppModule {}
