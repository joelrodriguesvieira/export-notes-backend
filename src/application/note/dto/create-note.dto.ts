import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNoteDTO {
  @IsString()
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
