import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { Disciplina } from '@prisma/client';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DisciplinaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(dto: CreateDisciplinaDto): Promise<Disciplina> {
    return this.prismaService.disciplina.create({ data: dto });
  }

  findAll(): Promise<Disciplina[]> {
    return this.prismaService.disciplina.findMany({ include: { curso: true } });
  }

  findById(id: string): Promise<Disciplina | null> {
    return this.prismaService.disciplina.findUnique({
      where: { id },
      include: { curso: true },
    });
  }

  update(id: string, dto: UpdateDisciplinaDto): Promise<Disciplina> {
    return this.prismaService.disciplina.update({ where: { id }, data: dto });
  }

  remove(id: string): Promise<Disciplina> {
    return this.prismaService.disciplina.delete({ where: { id } });
  }
}
