import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CursoModule } from './curso/curso.module';
import { DisciplinaModule } from './disciplina/disciplina.module';

@Module({
  imports: [CursoModule, DisciplinaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
