import { IsEnum, IsNotEmpty } from 'class-validator';
import { Roles } from '../schemas/role.schema';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsEnum(Roles, { message: 'Please enter correct roles.' })
  readonly role: Roles;


  readonly created_at:string;
  readonly updated_at:string;
}
