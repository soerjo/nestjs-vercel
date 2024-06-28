import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateExampleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Length(3, 255)
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  phone_number: string;
}
