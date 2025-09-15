import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { Curso } from '@prisma/client';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CursoRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(dto: CreateCursoDto): Promise<Curso> {
    return this.prismaService.curso.create({
      data: dto,
    });
  }

  findAll(): Promise<Curso[]> {
    return this.prismaService.curso.findMany({
      include: { disciplinas: true },
    });
  }

  findById(id: string): Promise<Curso | null> {
    return this.prismaService.curso.findUnique({
      where: { id },
      include: { disciplinas: true },
    });
  }

  update(id: string, dto: UpdateCursoDto): Promise<Curso> {
    return this.prismaService.curso.update({ where: { id }, data: dto });
  }

  remove(id: string): Promise<Curso> {
    return this.prismaService.curso.delete({ where: { id } });
  }
}
