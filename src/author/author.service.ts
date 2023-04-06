import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
const moment = require('moment'); 
import mongoose from 'mongoose';
import { CreateAuthorDto } from './dto/create-author.dto';
import { LoginDtoAuthor } from './dto/login.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './schemas/author.schema';

@Injectable()
export class AuthorService {

  constructor(
    @InjectModel(Author.name)
    private authorModel: mongoose.Model<Author>,
    // private userModel:mongoose.Model<User>
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const { author_name,book_name ,created_at,updated_at,role } = createAuthorDto;
    const author = await this.authorModel.create({
      author_name,
      book_name,
      role,
      created_at:moment().tz(this.getTimeZone()).format(),
      updated_at:moment().tz(this.getTimeZone()).format()
    });
    return author
      
  }

   //login 
  //  async login(loginDto: LoginDtoAuthor): Promise<{ token: string, author:object }> {
  //   const { role } = loginDto;

  //   const author = await this.authorModel.findOne({ role });

   

  //   const token = this.jwtService.sign({ id: author._id });

  //   return { token,author };
  // }
  


  // async findAll() :Promise<Author[]>{
  //   const authors = await this.authorModel
  //   .find()
  // return authors ;
  // }

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }


   getTimeZone():string{
    const offsetMinutes=new Date().getTimezoneOffset();
    const offsetHours=offsetMinutes/60;
    const offsetString=offsetHours>0?`+${offsetHours}`: offsetHours.toString();
    return  offsetString || 'UTC'
    }
}
