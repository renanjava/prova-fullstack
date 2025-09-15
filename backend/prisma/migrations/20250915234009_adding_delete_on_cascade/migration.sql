-- DropForeignKey
ALTER TABLE "public"."Disciplina" DROP CONSTRAINT "Disciplina_curso_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."Disciplina" ADD CONSTRAINT "Disciplina_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "public"."Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;
