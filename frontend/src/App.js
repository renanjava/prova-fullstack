import { useEffect, useState } from "react";

function App() {

  const [cursoData, setCurso] = useState([])
  const [disciplinaData, setDisciplina] = useState([])

  const [cursoForm, setCursoForm] = useState({
    nome: "",
    cargaHoraria: 0,
    dataInicio: ""
  });

  const [editCurso, setEditCurso] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/curso")
      .then(response => response.json())
      .then(data => setCurso(data))
  }, [])

  useEffect(() => {
    fetch("http://localhost:3000/disciplina")
      .then(response => response.json())
      .then(data => setDisciplina(data))
  }, [])

  const handleEdit = (curso) => {
    setEditCurso(curso);
    setCursoForm({
      nome: curso.nome,
      cargaHoraria: curso.cargaHoraria,
      dataInicio: curso.dataInicio.split("T")[0]
    });
  };

  const handleSubmitCurso = (e) => {
    e.preventDefault();

    const payload = {
      ...cursoForm,
      cargaHoraria: Number(cursoForm.cargaHoraria),
      dataInicio: new Date(cursoForm.dataInicio).toISOString()
    };

    if (editCurso) {
      fetch(`http://localhost:3000/curso/${editCurso.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(cursoAtualizado => {
          setCurso(cursoData.map(c => (c.id === cursoAtualizado.id ? cursoAtualizado : c)));
          setEditCurso(null);
          setCursoForm({ nome: "", cargaHoraria: 0, dataInicio: "" });
        });
    } else {
      fetch("http://localhost:3000/curso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(cursoCriado => {
          setCurso([...cursoData, cursoCriado]);
          setCursoForm({ nome: "", cargaHoraria: 0, dataInicio: "" });
        });
    }
  };

  return (
    <div className="App">
      <h2>{editCurso ? "Editar Curso" : "Criar Curso"}</h2>
      <form onSubmit={handleSubmitCurso}>
        <input
          type="text"
          placeholder="Nome"
          value={cursoForm.nome}
          onChange={e => setCursoForm({ ...cursoForm, nome: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Carga Horária"
          value={cursoForm.cargaHoraria}
          onChange={e => setCursoForm({ ...cursoForm, cargaHoraria: e.target.value })}
          required
        />
        <input
          type="date"
          value={cursoForm.dataInicio}
          onChange={e => setCursoForm({ ...cursoForm, dataInicio: e.target.value })}
          required
        />
        <button type="submit">
          {editCurso ? "Salvar Alterações" : "Adicionar Curso"}
        </button>
        {editCurso && (
          <button type="button" onClick={() => {
            setEditCurso(null);
            setCursoForm({ nome: "", cargaHoraria: 0, dataInicio: "" });
          }}>
            Cancelar
          </button>
        )}
      </form>
      <h2>Lista de Cursos</h2>
            <ul>
                {cursoData.map(curso => (
                    <li key={curso.id}>
                        <button onClick={() => {
                          fetch("http://localhost:3000/curso/"+curso.id, {
                            method: 'DELETE'
                          })
                          .then(res => res.text())
                          .then(res => setCurso(cursoData.filter(c => c.id !== curso.id)))
                        }}>Delete</button>
                        <button onClick={() => handleEdit(curso)}>Editar</button>
                        <p>
                            Nome:
                            {curso.nome}
                        </p>
                        <p>
                            Carga Horária:
                            {curso.cargaHoraria}
                        </p>
                        <p>
                            Data Início:
                            {curso.dataInicio}
                        </p>
                    </li>
                ))}
            </ul>
          <h2>Lista de Disciplinas</h2>
            <ul>
                {disciplinaData.map(disciplina => (
                    <li key={disciplina.id}>
                      <button onClick={() => {
                          fetch("http://localhost:3000/disciplina/"+disciplina.id, {
                            method: 'DELETE'
                          })
                          .then(res => res.text())
                          .then(res => console.log(res))
                        }}>Delete</button>
                        <p>
                            Nome:
                            {disciplina.nome}
                        </p>
                    </li>
                ))}
            </ul>
    </div>
  );
}

export default App;
