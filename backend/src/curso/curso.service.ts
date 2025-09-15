import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { CursoRepository } from './curso.repository';

@Injectable()
export class CursoService {
  constructor(private readonly cursoRepository: CursoRepository) {}
  create(createCursoDto: CreateCursoDto) {
    return this.cursoRepository.create(createCursoDto);
  }

  findAll() {
    return this.cursoRepository.findAll();
  }

  async findOne(id: string) {
    const curso = await this.cursoRepository.findById(id);
    if (!curso) {
      throw new NotFoundException('Curso não encontrado');
    }
    return curso;
  }

  async update(id: string, updateCursoDto: UpdateCursoDto) {
    await this.findOne(id);
    return this.cursoRepository.update(id, updateCursoDto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.cursoRepository.remove(id);
  }
}
