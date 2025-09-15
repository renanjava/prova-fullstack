-- CreateTable
CREATE TABLE "public"."Curso" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cargaHoraria" INTEGER NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Disciplina" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "curso_id" TEXT NOT NULL,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Disciplina" ADD CONSTRAINT "Disciplina_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "public"."Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
