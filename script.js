const cursos = [
  // Primer semestre
  { codigo: "SOC101", nombre: "Sociedad y Profesión I", prer: [], semestre: 1 },
  { codigo: "BIO101", nombre: "Biología Celular y Molecular", prer: [], semestre: 1 },
  { codigo: "QUI101", nombre: "Química General y Orgánica", prer: [], semestre: 1 },
  { codigo: "ANA101", nombre: "Anatomía", prer: [], semestre: 1 },
  { codigo: "MAT101", nombre: "Matemática I", prer: [], semestre: 1 },
  { codigo: "FIS101", nombre: "Física I", prer: [], semestre: 1 },

  // Segundo semestre
  { codigo: "SOC102", nombre: "Sociedad y Profesión II", prer: ["SOC101"], semestre: 2 },
  { codigo: "FIS102", nombre: "Física II", prer: ["MAT101", "FIS101"], semestre: 2 },
  { codigo: "FISIO101", nombre: "Fisiología I", prer: ["QUI101", "FIS101"], semestre: 2 },
  { codigo: "BIOQ101", nombre: "Bioquímica", prer: ["QUI101"], semestre: 2 },
  { codigo: "GEN101", nombre: "Genética", prer: [], semestre: 2 },
  { codigo: "HIST101", nombre: "Histología y Embriología", prer: [], semestre: 2 },
  { codigo: "MAT102", nombre: "Matemática II", prer: ["MAT101"], semestre: 2 },
];

function crearCursoHTML(curso) {
  const div = document.createElement("div");
  div.className = "curso bloqueado";
  div.textContent = curso.nombre;
  div.id = curso.codigo;

  div.onclick = () => {
    if (div.classList.contains("bloqueado")) return;
    div.classList.toggle("aprobado");
    actualizarDisponibles();
  };

  return div;
}

function actualizarDisponibles() {
  cursos.forEach(curso => {
    const div = document.getElementById(curso.codigo);
    if (div.classList.contains("aprobado")) return;

    const prerequisitosListos = curso.prer.every(cod => {
      const prereDiv = document.getElementById(cod);
      return prereDiv && prereDiv.classList.contains("aprobado");
    });

    if (prerequisitosListos) {
      div.classList.remove("bloqueado");
      div.classList.add("desbloqueado");
    } else {
      div.classList.add("bloqueado");
      div.classList.remove("desbloqueado");
    }
  });
}

function mostrarMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  for (let semestre = 1; semestre <= 2; semestre++) {
    const semestreDiv = document.createElement("div");
    semestreDiv.className = "semestre";
    semestreDiv.innerHTML = `<h2>Semestre ${semestre}</h2>`;

    cursos
      .filter(c => c.semestre === semestre)
      .forEach(curso => {
        const divCurso = crearCursoHTML(curso);
        semestreDiv.appendChild(divCurso);
      });

    contenedor.appendChild(semestreDiv);
  }

  actualizarDisponibles();
}

document.addEventListener("DOMContentLoaded", mostrarMalla);
