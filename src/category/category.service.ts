import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Helper } from 'src/helpers/helper';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
    // private jwtService: JwtService,
    private helper:Helper,
    // private storeModel: Model<Store>,

  ) {}
 
 async create(createCategoryDto: CreateCategoryDto,id:string):Promise<{ category: object}> {
    const {
       category_name,
      store_id,
      created_at,
      updated_at,
    } = createCategoryDto;

    const time=this.helper.timeZone();
const updated=this.helper.created();
const created=this.helper.updated();
const category = await this.categoryModel.create({
  category_name,
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

return { category};
  }

  async findAll(): Promise<Category[]> {
    const users = await this.categoryModel
      .find().populate("store_id")
    return users;
  }


  

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
