import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './schemas/store.schema';
const moment = require('moment-timezone');
import jwt_decode from "jwt-decode";

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name)
    private storeModel: Model<Store>,
    private jwtService: JwtService,
  ) {}

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
    const token = this.jwtService.sign({
      _id: stores._id,
      name: name,
      role: role,
      slug: stores.slug,
      time_zone: stores.time_zone,
      created_at:stores.created_at,
      updated_at:stores.updated_at
    });
   
 
const decoded = jwt_decode(token);
console.log(decoded);
    return { token, stores };
  }

  findAll() {
    return `This action returns all store`;
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
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
}
