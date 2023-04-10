import {
  Get,
  Injectable,
  Query,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
const moment = require('moment-timezone');
import jwt_decode from 'jwt-decode';
import { Store } from 'src/store/schemas/store.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  //register



  async signUp(signUpDto: SignUpDto ,store:Store): Promise<{ token: string; user: object}> {
   
    const {
      user_name,
      email,
      password,
      role,
      slug,
      phone,
      store_id,
      created_at,
      updated_at,
    } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      user_name,
      email,
      password: hashedPassword,
      role,
      phone,
      slug,
      store_id:store,
      time_zone: 'America/Edmonton',
      created_at: moment().tz('America/Edmonton').format(),
      updated_at: moment().tz('America/Edmonton').format(),
    });

    const token = this.jwtService.sign({ _id: user._id });

    return { token, user };
  }

  //login
  async login(loginDto: LoginDto): Promise<{ token: string; user: object }> {
    const { email, password, role, time_zone, created_at, updated_at, slug } =
      loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (role !== user.role) {
      throw new UnauthorizedException('Invalid role');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
  


    const token = this.jwtService.sign({
      _id: user._id,
      role: user.role,
      slug: user.slug,
      time_zone: user.time_zone,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });

    const decoded = jwt_decode(token);
    console.log(decoded);

    user.depopulate("-password")
    return { token, user };
  }

  // return { token,user };

  // getUsers

  // async findAll(): Promise<User[]> {
  //   const users = await this.userModel
  //     .find().select("-password")
  //   return users;
  // }

  //getUserdetails
  // async findById(id: string): Promise<User> {
  //   const user = await this.userModel.findById(id).select("-password");

  //   if (!user) {
  //     throw new NotFoundException('User not found.');
  //   }
  //   return user;
  // }

  // delete user
  // async deleteById(id: string): Promise<User> {
  //   return await this.userModel.findByIdAndDelete(id);
  // }

  //update user

  // async updateById(id: string, user: User): Promise<user:any> {
  //   return await this.userModel.findByIdAndUpdate(id, user, {
  //     new: true,
  //     runValidators: true,
  //   });
  // }
  //  getTimeZone():string{
  //   const offsetMinutes=new Date().getTimezoneOffset();
  //   const offsetHours=offsetMinutes/60;
  //   const offsetString=offsetHours>0?`+${offsetHours}`: offsetHours.toString();
  //   return  offsetString || 'UTC'
  //   }
 
}
