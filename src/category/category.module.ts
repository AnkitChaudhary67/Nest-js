import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schemas/category.schema';
import { Helper } from 'src/helpers/helper';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    Helper,
    MongooseModule.forFeature([{ name: 'Category', schema:CategorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService,Helper]
})
export class CategoryModule {}
