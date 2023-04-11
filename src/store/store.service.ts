import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './schemas/store.schema';
const moment = require('moment-timezone');
import jwt_decode from "jwt-decode";
import { Helper } from 'src/helpers/helper';
import { Category } from 'src/category/schemas/category.schema';
import { Product } from 'src/product/schemas/product.schema';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name)
    private storeModel: Model<Store>,
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
    @InjectModel(Product.name)
    private productModel: Model<Product>,
    private helper:Helper,
  ) {}

  getObjectId(id: string): Types.ObjectId  {
    return new Types.ObjectId(id)
  }
  

  async create(
    createStoreDto: CreateStoreDto,
  ): Promise<{ token: string; stores: object }> {
    const { name, role, slug, time_zone, created_at, updated_at } =
      createStoreDto;

    const stores = await this.storeModel.create({
      name,
      role,
      slug,
      time_zone: 'America/Edmonton',
      created_at: moment().tz('America/Edmonton').format(),
      updated_at: moment().tz('America/Edmonton').format(),
    });

    const payload={
      _id: stores._id,
      name: name,
      role: role,
      slug: stores.slug,
      time_zone: stores.time_zone,
      created_at:stores.created_at,
      updated_at:stores.updated_at
    }
  
    const token =  this.helper.createAcesstoken(payload);
    const decode=this.helper.decodeAcesstoken(token)
    console.log(decode);
    return { token, stores };
  }

  async findStore(): Promise<Store[]> {
    const stores = await this.storeModel.find()
    return stores;
  }
  




  async findOne(id: string): Promise<Store> {
    
   
   
    const store = await this.storeModel.findById(id)

    if (!store) {
      throw new NotFoundException('User not found.');
    }
    return store;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }

  getTimeZone(): string {
    const offsetMinutes = new Date().getTimezoneOffset();
    const offsetHours = offsetMinutes / 60;
    const offsetString =
      offsetHours > 0 ? `+${offsetHours}` : offsetHours.toString();
    return offsetString || 'UTC';
  }

  async storeCategoryProduct(id: string): Promise<any> {
   
    const store = await this.storeModel.aggregate([
      {
        $match: {
          _id: this.getObjectId(id)
        }
      },
      {
        $lookup: {
          // from: "categories",
          from: this.categoryModel.collection.name,
          foreignField: "store_id",
          localField: "_id",
          pipeline:[
            {
              $lookup: {
                // from: "products",
                from: this.productModel.collection.name,
                foreignField: "category_id",
                localField: "_id",
                as: "product"
              }
            }
          ],
          as: "category"
        }
      }
    ])

    if (!store) {
      throw new NotFoundException('User not found.');
    }
    return store;
  }
}
