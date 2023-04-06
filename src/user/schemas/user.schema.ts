import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Exclude} from 'class-transformer'
import * as moment from 'moment-timezone';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}


@Schema({
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Email alreay exist'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  role:Role;

  @Prop()
    // @Prop({default:()=>moment().tz(getTimeZone())})
  created_at:string

  @Prop()
  updated_at:string
}

export const UserSchema = SchemaFactory.createForClass(User);


// function getTimeZone():string{
//   const offsetMinutes=new Date().getTimezoneOffset();
//   const offsetHours=offsetMinutes/60;
  
//   const offsetString=offsetHours>0?`+${offsetHours}`: offsetHours.toString();
  
//   return moment.tz.zone(offsetString).abbr(moment)
//   }

  