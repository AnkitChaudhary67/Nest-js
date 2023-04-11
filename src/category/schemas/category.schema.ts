import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Store } from 'src/store/schemas/store.schema';

const mongoose=require('mongoose')

@Schema({
})
export class Category extends Document {

  @Prop()
  category_name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Store' })
  store_id: Store;
  
@Prop()
time_zone:string;

  @Prop()
  created_at:string;

  @Prop()
  updated_at:string
}



export const CategorySchema = SchemaFactory.createForClass(Category);


  