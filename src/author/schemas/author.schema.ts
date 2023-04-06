import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Exclude} from 'class-transformer'
import * as moment from 'moment-timezone';



@Schema({
})
export class Author extends Document {
  @Prop()
  author_name: string;

  @Prop()
  book_name: string;


  @Prop()
  role:string;

  @Prop()
 
  created_at:string

  @Prop()
  updated_at:string
}

export const AuthorSchema = SchemaFactory.createForClass(Author);


// function getTimeZone():string{
//   const offsetMinutes=new Date().getTimezoneOffset();
//   const offsetHours=offsetMinutes/60;
  
//   const offsetString=offsetHours>0?`+${offsetHours}`: offsetHours.toString();
  
//   return moment.tz.zone(offsetString).abbr(moment)
//   }

  