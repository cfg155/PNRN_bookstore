import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { JwtGuard } from 'src/auth/guard';

@Controller()
export class BookController {
  constructor(private bookService: BookService) {}

  @UseGuards(JwtGuard)
  @Get('books')
  async getBooks() {
    return this.bookService.getBooks();
  }

  @UseGuards(JwtGuard)
  @Get('book/:id')
  async getBookById(@Param() { id }: { id: string }) {
    return this.bookService.getBookById(id);
  }
}
