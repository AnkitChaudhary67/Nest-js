import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { type } from 'os';
// import { RoleGuard } from 'src/role.guard';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
// import { LoginDtoAuthor } from './dto/login.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  // @Post('/auhtor/login')
  // login(@Body() loginDto: LoginDtoAuthor): Promise<{ token: string }> {
  //   return this.authorService.login(loginDto);
  // }
  
  // @Get('/auhtor/get')
  // @UseGuards(new RoleGuard('admin'))
  // findAll() {
  //   return this.authorService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}
