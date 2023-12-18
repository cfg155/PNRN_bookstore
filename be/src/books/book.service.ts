import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}
  async getBooks() {
    const books = await this.prisma.book.findMany();
    return books;
  }

  async getBookById(id: string) {
    const book = await this.prisma.book.findFirst({ where: { id } });
    if (!book) throw new NotFoundException();

    return book;
  }
}
