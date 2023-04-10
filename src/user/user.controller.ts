import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import  { AuthStrategy } from '../store/auth.strategy'

@Controller()
export class UserController {
  constructor(private userService: UserService) {}



  @Post('/register')
  signUp(@Body() signUpDto: SignUpDto, @Req() req): Promise<{ user: object }> {
    return this.userService.signUp(signUpDto, req.store_id);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.userService.login(loginDto);
  }

  // @Get('users')
  // async getUsers(): Promise<User[]> {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // async getUser(
  //   @Param('id')
  //   id: string,
  // ): Promise<User> {
  //   return this.userService.findById(id);
  // }

  // @Delete(':id')
  // async deleteUser(
  //   @Param('id')
  //   id: string,
  // ): Promise<User> {
  //   return this.userService.deleteById(id);
  // }

  // @Put(':id')
  // async updateUser(
  //   @Param('id')
  //   id: string,
  //   @Body()
  //   user: UpdateUserDto,
  // ): Promise<User> {
  //   return this.userService.updateById(id ,user);
  // }

  //   @Post('/file')
  //   @UseInterceptors(
  //     FileInterceptor('file', {
  //       storage: diskStorage({
  //         destination: './uploads',
  //         filename: (req, file, callback) => {
  //           const uniqueSuffix =
  //             Date.now() + '-' + Math.round(Math.random() * 1e9);
  //           const ext = extname(file.originalname);
  //           const filename = `${uniqueSuffix}${ext}`;
  //           callback(null, filename);
  //         },
  //       }),
  //     }),
  //   )
  // handleUpload(@UploadedFile() file:Express.Multer.File){
  //   console.log('file',file);
  //   return 'file upload'
  // }
}
