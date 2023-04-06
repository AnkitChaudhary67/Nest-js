import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateAuthorDto {
    @IsNotEmpty()
    @IsString()
    readonly author_name: string;
   
    @IsNotEmpty()
    @IsString()
    readonly book_name: string;

    @IsNotEmpty()
    @IsString()
    readonly role: string;

    readonly created_at:string;
  
  
    readonly updated_at:string;

}


