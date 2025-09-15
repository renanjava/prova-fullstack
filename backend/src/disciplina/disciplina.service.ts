import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { DisciplinaRepository } from './disciplina.repository';

@Injectable()
export class DisciplinaService {
  constructor(private readonly disciplinaRepository: DisciplinaRepository) {}
  create(createDisciplinaDto: CreateDisciplinaDto) {
    return this.disciplinaRepository.create(createDisciplinaDto);
  }

  findAll() {
    return this.disciplinaRepository.findAll();
  }

  async findOne(id: string) {
    const disciplina = await this.disciplinaRepository.findById(id);
    if (!disciplina) {
      throw new NotFoundException('disciplina não encontrada');
    }
    return disciplina;
  }

  async update(id: string, updateDisciplinaDto: UpdateDisciplinaDto) {
    await this.findOne(id);
    return this.disciplinaRepository.update(id, updateDisciplinaDto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.disciplinaRepository.remove(id);
  }
}
