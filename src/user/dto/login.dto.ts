import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '../schemas/user.schema';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
    @IsEnum(Role, { message: 'Please enter correct role.' })
    readonly  role: Role;

    readonly slug:string;

    readonly time_zone:string;
    
    readonly created_at:string;
  
    readonly updated_at:string;
  
}