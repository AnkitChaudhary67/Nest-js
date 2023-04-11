import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { Store } from 'src/store/schemas/store.schema';


export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    readonly category_name: string;
  

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly store_id: Store;
  
  readonly time_zone:string;
    
    readonly created_at:string;
  
  
    readonly updated_at:string;
}

