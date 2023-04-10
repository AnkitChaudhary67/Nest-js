import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import {  Roles } from '../schemas/store.schema';

export class CreateStoreDto {
    @IsNotEmpty()
  @IsString()
  readonly name: string;



  @IsNotEmpty()
  @IsEnum(Roles, { message: 'Please enter correct role.' })
  readonly  role: Roles;

  
  readonly slug:string;

  readonly time_zone:string;
  
  readonly created_at:string;

  readonly updated_at:string;
}




