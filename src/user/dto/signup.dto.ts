import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { Store } from 'src/store/schemas/store.schema';
import { Role } from '../schemas/user.schema';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly user_name: string;

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

  @IsNotEmpty()
@IsNumber()
readonly phone:number

@IsEmpty({ message: 'You cannot pass user id' })
readonly store_id: Store;

// readonly store_id: string;

  readonly slug:string;

readonly time_zone:string;
  
  readonly created_at:string;


  readonly updated_at:string;

}