import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import "./css/turmaCard.css";

export default function TurmaCard({ filial_id, turmas, rerun, onClose }) {
  const [edit, setEdit] = useState(false);
  const [deleteCard, setDeleteCard] = useState({ turma: null, show: false });

  async function deleteTurma(id, nome) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/turmas/delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ id, nome }),
        }
      );

      if (!res.ok) throw new Error(`Erro ao deletar turma: ${res.status}`);
      const data = await res.json();
      console.log("Turma deletada:", data);
      rerun();
    } catch (error) {
      console.error("Erro ao deletar turma:", error);
    }
  }

  function DeleteCard({ turma }) {
    return (
      <div className="deleteCard">
        <h1>Você tem certeza que quer deletar a turma {turma.nome} ?</h1>
        <div style={{ display: "flex", gap: "5px" }}>
          <button
            type="button"
            onClick={() => setDeleteCard({ turma: null, show: false })}
            className="cancel"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => {
              deleteTurma(turma.id, turma.nome);
              setDeleteCard({ turma: null, show: false });
            }}
          >
            DELETAR
          </button>
        </div>
      </div>
    );
  }
  function Cards({ turma }) {
    return (
      <div className="turmaCard">
        <div>
          <strong>ID:</strong> {turma.id}
        </div>
        <div>
          <strong>Código da Turma:</strong> {turma.codigo_turma}
        </div>
        <div>
          <strong>Nome:</strong> {turma.nome}
        </div>
        <div style={{ display: "flex" }}>
          <button
            type="button"
            onClick={() => setDeleteCard({ turma: turma, show: true })}
          >
            <DeleteForeverIcon />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="turmaCardOverlay">
      <button type="button" className="closeButton" onClick={onClose}><CloseIcon /></button>
      <div className="turmasCardRoot">
        <div className="turmasCardContainer">
          {turmas.map((t) => (
            <Cards turma={t} key={t.id} />
          ))}
        </div>
      </div>
      {deleteCard.show && <DeleteCard turma={deleteCard.turma} />}
    </div>
  );
}
