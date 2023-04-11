import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Helper } from 'src/helpers/helper';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
    // private jwtService: JwtService,
    private helper:Helper,
    // private storeModel: Model<Store>,

  ) {}
 
  async create(createProductDto: CreateProductDto, id:string,categoryId:string):Promise<{product:object}> {
       
    const {
      product_name,
      price,
      category_id,
     store_id,
     created_at,
     updated_at,
   } = createProductDto;

;

   const time=this.helper.timeZone();
const updated=this.helper.created();
const created=this.helper.updated();
const product = await this.productModel.create({
 product_name,
 price,
 category_id:categoryId,
 store_id:id,
 time_zone: time,
 created_at: updated,
 updated_at: created,
});


// const payload = {
//   _id: category._id,
//   name:category.name,
//  store_id:category.store_id, 
//  time_zone: category.time_zone,
//  created_at: category.created_at,
//  updated_at: category.updated_at,
// };
// const token =  this.helper.createAcesstoken(payload);
// const decode=this.helper.decodeAcesstoken(token)
// console.log(decode);

return { product};
  }

 
  async findAll(): Promise<Product[]> {
    const products = await this.productModel
      .find().populate("category_id")
    return products;
  }

  

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
