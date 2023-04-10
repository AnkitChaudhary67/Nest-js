import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Exclude} from 'class-transformer'
import * as moment from 'moment-timezone';
import { Store } from 'src/store/schemas/store.schema';
const slugify=require('slugify');
const slug = require('mongoose-slug-generator');
const mongoose=require('mongoose')

export enum Role {
  ADMIN = 'store',
  USER = 'user',
  CUSTOMER = 'customer',
  DRIVER='driver',
  WAITER='waiter'
}

mongoose.plugin(slug)

@Schema({
})
export class User extends Document {
  @Prop()
  user_name: string;

  @Prop({ unique: [true, 'Email alreay exist'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  role:Role;

  @Prop()
  phone:number;

  @Prop({ type: String, slug: "user_name" })
  slug:string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Store' })
  store_id: Store;

  @Prop()
time_zone:string;

  @Prop()
  created_at:string;

  @Prop()
  updated_at:string

  // @Prop({ type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Store',})
  // store_id:Store;

}

export const UserSchema = SchemaFactory.createForClass(User);


// function getTimeZone():string{
//   const offsetMinutes=new Date().getTimezoneOffset();
//   const offsetHours=offsetMinutes/60;
  
//   const offsetString=offsetHours>0?`+${offsetHours}`: offsetHours.toString();
  
//   return moment.tz.zone(offsetString).abbr(moment)
//   }

  