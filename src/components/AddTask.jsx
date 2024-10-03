import { useState } from "react";
import Input from "./Input";

function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState(""); //ESTADO PADRÃO
  const [description, setDescription] = useState("");

  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">

      <Input
        type="text"
        placeholder="Digite o titulo da tarefa"
        value={title} //O VALOR DO INPUT VAI SER O ESTADO ATUAL
        onChange={(event) => setTitle(event.target.value)} //FUNÇÃO QUE ATUALIZA O ESTADO DO INPUT
      />
      <Input
        type="text"
        placeholder="Digite a descrição da tarefa"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
        onClick={() => {
          //VERIFICAR SE O TITULO E A DESCRIÇÃO ESTÃO PREENCHIDOS.
          if (!title.trim() || !description.trim()) {
            return alert('Preecha o título e a descrição da tarefa')
          }
          onAddTaskSubmit(title, description);
          setTitle("");
          setDescription("")
        }}
      //FUNCÃO QUE PEGA OS ESTADOS ATUAIS E PASSA OS VALORES PARA CRIAR UMA TAREFA
      >
        Adicionar
      </button>

    </div>
  )
}

export default AddTask;