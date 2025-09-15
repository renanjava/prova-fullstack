import { Transform, Type } from 'class-transformer';
import {
    IsDate,
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class CreateCursoDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsInt()
    @IsNotEmpty()
    cargaHoraria: number;

    @IsNotEmpty()
    @Type(() => Date)
    dataInicio: Date;
}
