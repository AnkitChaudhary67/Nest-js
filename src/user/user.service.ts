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

import jwt_decode from 'jwt-decode';
import { Store } from 'src/store/schemas/store.schema';
import { Helper } from 'src/helpers/helper';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    // private jwtService: JwtService,
    private helper:Helper,
    // private storeModel: Model<Store>,

  ) {}

  //register



  async signUp(signUpDto: SignUpDto , id:string): Promise<{ token: string; user: object}> {

   
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

const time=this.helper.timeZone();
const updated=this.helper.created();
const created=this.helper.updated();
    const user = await this.userModel.create({
      user_name,
      email,
      password: hashedPassword,
      role,
      phone,
      slug,
      store_id:id,
      time_zone: time,
      created_at: updated,
      updated_at: created,
    });

    const payload = {
       _id: user._id,
       email:user.email,
      role: user.role,
      slug: user.slug,
      store_id:user.store_id, 
      time_zone: user.time_zone,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
    const token =  this.helper.createAcesstoken(payload);
    const decode=this.helper.decodeAcesstoken(token)
    console.log(decode);
    
    return { user, token };

    // const token = this.jwtService.sign({ _id: user._id });

    // return { token, user };
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
  

    const payload = {
      _id: user._id,
      email:user.email,
     role: user.role,
     slug: user.slug,
     store_id:user.store_id, 
     time_zone: user.time_zone,
     created_at: user.created_at,
     updated_at: user.updated_at,
    };
    const token =  this.helper.createAcesstoken(payload);

    // const token = this.jwtService.sign({
    //   _id: user._id,
    //   role: user.role,
    //   slug: user.slug,
    //   store_id:user.store_id, 
    //   time_zone: user.time_zone,
    //   created_at: user.created_at,
    //   updated_at: user.updated_at,
    // });


    const decode=this.helper.decodeAcesstoken(token)
    console.log(decode);
    
    
    // const decoded = jwt_decode(token);
    // console.log(decoded);
    return { token, user };
  }

  // return { token,user };

  // getUsers

  // async findAll(): Promise<User[]> {
  //   const users = await this.userModel
  //     .find().select("-password")
  //   return users;
  // }


  async findAll(): Promise<User[]> {
    const users = await this.userModel
      .find().select("-password").populate("store_id")
    return users;
  }

 


  // getStoredetails

  // async findStore(id: string): Promise<Store> {
   
  //   const store = await this.storeModel.findById(id)

  //   if (!store) {
  //     throw new NotFoundException('User not found.');
  //   }
  //   return store;
  // }


  // getUserdetails
  // async findById(id: string): Promise<User> {
  //   const user = await this.userModel.findById(id).populate("store_id");
  //   return user
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
