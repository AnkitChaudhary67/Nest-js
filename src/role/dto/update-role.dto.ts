import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import {
    IsEnum,
    IsOptional,
  } from 'class-validator';
import { Roles } from '../schemas/role.schema';
export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @IsOptional()
    @IsEnum(Roles, { message: 'Please enter correct category.' })
    readonly role: Roles;

    readonly created_at:string;


    readonly updated_at:string;
}


  
 