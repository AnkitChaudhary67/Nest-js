import {
    IsEmpty,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  import { User } from '../../user/schemas/user.schema';
  import { Category, Role } from '../schemas/book.schema';
  
  export class UpdateBookDto {
    @IsOptional()
    @IsString()
    readonly title: string;
  
    @IsOptional()
    @IsString()
    readonly description: string;
  
    @IsOptional()
    @IsString()
    readonly author: string;
  
    @IsOptional()
    @IsNumber()
    readonly price: number;
  
    @IsOptional()
    @IsEnum(Category, { message: 'Please enter correct category.' })
    readonly category: Category;

    @IsOptional()
    @IsEnum(Role, { message: 'Please enter correct role.' })
    readonly role: Role;
  
    @IsEmpty({ message: 'You cannot pass user id' })
    readonly user: User;

  
  }
