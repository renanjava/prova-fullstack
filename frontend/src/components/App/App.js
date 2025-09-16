import { useEffect, useState } from "react";
import { API_URL } from "../../constants/constants";

function App() {
  const [cursoData, setCurso] = useState([])
  const [disciplinaData, setDisciplina] = useState([])

  const [cursoForm, setCursoForm] = useState({
    nome: "",
    cargaHoraria: 0,
    dataInicio: ""
  });
  const [cursoSelecionado, setCursoSelecionado] = useState(null)
  const [disciplinaForm, setDisciplinaForm] = useState({
    nome: ""
  });

  const [editCurso, setEditCurso] = useState(null);
  const [editDisciplina, setEditDisciplina] = useState(null)

  useEffect(() => {
    fetch(`${API_URL}/curso`)
      .then(response => response.json())
      .then(data => setCurso(data))
  }, [])

  useEffect(() => {
    fetch(`${API_URL}/disciplina`)
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

  const handleEditDisciplina = (disciplina) => {
    setEditDisciplina(disciplina);
    setDisciplinaForm({
      nome: disciplina.nome
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
      fetch(`${API_URL}/curso/${editCurso.id}`, {
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
      fetch(`${API_URL}/curso`, {
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

  const handleSubmitDisciplina = (e) => {
    e.preventDefault();

    if (editDisciplina) {
      fetch(`${API_URL}/disciplina/${editDisciplina.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(disciplinaForm)
      })
        .then(res => res.json())
        .then(disciplinaAtualizada => {
          setDisciplina(disciplinaData.map(d => d.id === disciplinaAtualizada.id ? disciplinaAtualizada : d));
          setEditDisciplina(null);
          setDisciplinaForm({ nome: "" });
        });

    } else {
      if (!cursoSelecionado) return;

      const payload = {
        ...disciplinaForm,
        curso_id: cursoSelecionado.id
      };

      fetch(`${API_URL}/disciplina`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(disciplinaCriada => {
          setDisciplina([...disciplinaData, disciplinaCriada]);
          setDisciplinaForm({ nome: "" });
          setCursoSelecionado(null);
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
                      fetch(`${API_URL}/curso/${curso.id}`, {
                        method: 'DELETE'
                      })
                      .then(res => res.text())
                      .then(() => {
                        setCurso(cursoData.filter(c => c.id !== curso.id))
                        setDisciplina(disciplinaData.filter(d => d.curso_id !== curso.id))
                      })
                    }}>Delete</button>
                    <button onClick={() => handleEdit(curso)}>Editar</button>
                    <button onClick={() => setCursoSelecionado(curso)}>
                      Adicionar Disciplina
                    </button>
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

                    {cursoSelecionado && cursoSelecionado.id === curso.id && (
                      <form onSubmit={handleSubmitDisciplina}>
                        <input
                          type="text"
                          placeholder="Nome da Disciplina"
                          value={disciplinaForm.nome}
                          onChange={e => setDisciplinaForm({ ...disciplinaForm, nome: e.target.value })}
                          required
                        />
                        <button type="submit">Salvar Disciplina</button>
                        <button type="button" onClick={() => setCursoSelecionado(null)}>Cancelar</button>
                      </form>
                    )}
                </li>
            ))}
        </ul>
      <h2>Lista de Disciplinas</h2>
        <ul>
            {disciplinaData.map(disciplina => (
                <li key={disciplina.id}>
                  <button onClick={() => {
                      fetch(`${API_URL}/disciplina/${disciplina.id}`, {
                        method: 'DELETE'
                      })
                        .then(res => res.text())
                        .then(() => setDisciplina(disciplinaData.filter(c => c.id !== disciplina.id)))
                    }}>Delete</button>
                    <button onClick={() => handleEditDisciplina(disciplina)}>Editar</button>
                    <p>
                        Nome:
                        {disciplina.nome}
                    </p>
                </li>
            ))}
        </ul>
      {editDisciplina && (
        <div>
          <h2>Editar Disciplina</h2>
          <form onSubmit={handleSubmitDisciplina}>
            <input
              type="text"
              placeholder="Nome da Disciplina"
              value={disciplinaForm.nome}
              onChange={e => setDisciplinaForm({ ...disciplinaForm, nome: e.target.value })}
              required
            />
            <button type="submit">Salvar Alterações</button>
            <button type="button" onClick={() => {
              setEditDisciplina(null);
              setDisciplinaForm({ nome: "" });
            }}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
