import { Module } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaController } from './disciplina.controller';
import { DisciplinaRepository } from './disciplina.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DisciplinaController],
  providers: [DisciplinaService, DisciplinaRepository],
})
export class DisciplinaModule {}
