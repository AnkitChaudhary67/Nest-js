import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { RoleModule } from './role/role.module';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
import { Helper } from './helpers/helper';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
   UserModule ,
  //  MulterModule.register({ dest: '/uploads'}),
   BookModule,
  RoleModule,
  StoreModule,
  ProductModule,
  Helper,
  CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}