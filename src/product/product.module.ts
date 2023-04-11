import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Helper } from 'src/helpers/helper';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';

@Module({
  imports:[
    Helper,
    MongooseModule.forFeature([{ name: 'Product', schema:ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService,Helper]
})
export class ProductModule {}
