import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDisciplinaDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  curso_id: string;
}
