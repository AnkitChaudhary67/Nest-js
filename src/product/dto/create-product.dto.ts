import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "src/category/schemas/category.schema";
import { Store } from "src/store/schemas/store.schema";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    readonly product_name: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;
  

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly store_id: Store;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly category_id: Category;
  
  readonly time_zone:string;
    
    readonly created_at:string;
  
  
    readonly updated_at:string;
}
