import { useEffect, useState } from "react";

function App() {

  const [cursoData, setCurso] = useState([])
  const [disciplinaData, setDisciplina] = useState([])

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

  return (
    <div className="App">
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
