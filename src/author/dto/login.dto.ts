import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDtoAuthor {
  @IsNotEmpty()
  @IsString()
  readonly role: string;
}