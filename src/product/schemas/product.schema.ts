import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
const slug = require('mongoose-slug-generator');
const mongoose=require('mongoose')



export enum Category {
  VEG = 'Veg',
  NONVEG = 'Non-veg',
 
}



mongoose.plugin(slug)

@Schema({
})
export class Product extends Document {
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

  

}

export const ProductSchema = SchemaFactory.createForClass(Product);


// function getTimeZone():string{
//   const offsetMinutes=new Date().getTimezoneOffset();
//   const offsetHours=offsetMinutes/60;
  
//   const offsetString=offsetHours>0?`+${offsetHours}`: offsetHours.toString();
  
//   return moment.tz.zone(offsetString).abbr(moment)
//   }

  