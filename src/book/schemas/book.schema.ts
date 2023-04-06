import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Document } from 'mongoose';
// import * as moment from 'moment-timezone';



export enum Category {
  ADVENTURE = 'Adventure',
  CALSSICS = 'Classics',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

// export type BookDocument=Book & Document;

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop()
  price: number;

  @Prop()
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  role: Role;


  // @Prop({type:Date})
  // createdAt:Date

  // @Prop({type:Date})
  // updatedAt:Date
}

export const BookSchema = SchemaFactory.createForClass(Book);

// function getTimeZone():string{
// const offsetMinutes=new Date().getTimezoneOffset();
// const offsetHours=offsetMinutes/60;

// const offsetString=offsetHours>0?`+${offsetHours}`: offsetHours.toString();

// return moment.tz.zone(offsetString).abbr(1403465838805) || 'UTC';
// }