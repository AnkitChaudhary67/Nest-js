import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Store } from './schemas/store.schema';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(Store.name)
    private storeModel: Model<Store>,
 
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload) {
    const { _id } = payload;

    const store = await this.storeModel.findById(_id);
    if (!store) {
      throw new UnauthorizedException('Login first to access.');
    }
    return store;
  }
}


 