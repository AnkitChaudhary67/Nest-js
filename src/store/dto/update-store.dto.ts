import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreDto } from './create-store.dto';
import { Roles } from '../schemas/store.schema';
import {
    IsEnum,
    IsOptional,
  } from 'class-validator';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {

    @IsOptional()
    readonly name:string

    readonly slug: string;

    @IsOptional()
    @IsEnum(Roles, { message: 'Please enter correct category.' })
    readonly role: Roles;

    readonly time_zone:string;

    readonly created_at:string;


    readonly updated_at:string;
}




