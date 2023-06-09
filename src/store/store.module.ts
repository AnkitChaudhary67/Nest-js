import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreSchema } from './schemas/store.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthStrategy } from './auth.strategy';
import { Helper } from 'src/helpers/helper';
import { CategorySchema } from 'src/category/schemas/category.schema';
import { ProductSchema } from 'src/product/schemas/product.schema';

@Module({
  imports:[
    Helper,
    PassportModule.register({ defaultStrategy: 'auth' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'Store', schema: StoreSchema }]),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }])
  ],
  controllers: [StoreController],
  providers: [StoreService,AuthStrategy,Helper],
  exports: [AuthStrategy, PassportModule]
})
export class StoreModule {}
