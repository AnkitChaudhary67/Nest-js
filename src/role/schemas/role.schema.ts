import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
// import * as moment from 'moment-timezone';





export enum Roles {
  STORE = 'store',
  USER = 'user',
  CUSTOMER='customer',
  DRIVER = 'driver',
  WAITER='waiter'
}



@Schema({})
export class Role extends Document {
 

  @Prop()
  role: Roles;


  @Prop()
  created_at:string

  @Prop()
  updated_at:string
}

export const RoleSchema = SchemaFactory.createForClass(Role);

// function getTimeZone():string{
// const offsetMinutes=new Date().getTimezoneOffset();
// const offsetHours=offsetMinutes/60;

// const offsetString=offsetHours>0?`+${offsetHours}`: offsetHours.toString();

// return moment.tz.zone(offsetString).abbr(1403465838805) || 'UTC';
// }