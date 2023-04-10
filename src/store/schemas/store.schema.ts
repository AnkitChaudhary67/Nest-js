import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Exclude} from 'class-transformer'
import * as moment from 'moment-timezone';
const slugify=require('slugify');
const slug = require('mongoose-slug-generator');
const mongoose=require('mongoose')

export enum Roles {
  STORE = 'store',
  USER = 'user',
  CUSTOMER='customer',
  DRIVER = 'driver',
  WAITER='waiter'
}



mongoose.plugin(slug)

@Schema({
})
export class Store extends Document {

  @Prop({unique:[true,'Name already exist']})
  name: string;

  @Prop()
  role:Roles;

  @Prop({ type: String, slug: "name" })
  slug:string;


@Prop()
time_zone:string;

  @Prop()
  created_at:string;

  @Prop()
  updated_at:string
}



export const StoreSchema = SchemaFactory.createForClass(Store);


  