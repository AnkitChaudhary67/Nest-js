import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create-author.dto';
import {
    IsEmpty,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
    @IsOptional()
    @IsString()
    readonly author_name: string;
  
    @IsOptional()
    @IsString()
    readonly book_name: string;

    @IsOptional()
    @IsString()
    readonly role: string;
  
    @IsOptional()
    @IsString()
    readonly created_at: string;

    @IsOptional()
    @IsString()
    readonly updated_at: string;
  
}
