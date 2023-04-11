import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';
import { Store } from 'src/store/schemas/store.schema';


const mongoose=require('mongoose')

@Schema({
})
export class Product extends Document {
 

  @Prop()
  product_name: string;

  @Prop()
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category_id: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Store' })
  store_id: Store;

}

export const ProductSchema = SchemaFactory.createForClass(Product);


  