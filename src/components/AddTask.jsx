import { useState } from "react";
import { Save, Undo2, TrashIcon } from 'lucide-react';

function AddTask({ onAddTaskSubmit, onCloseTask, onDeleteTaskClick, initialData, readOnly }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [dataInicio, setDataInicio] = useState(initialData?.dataInicio || "");
  const [dataFim, setDataFim] = useState(initialData?.dataFim || "");
  const [custo, setCusto] = useState(initialData?.custo || "");
  const [status, setStatus] = useState(initialData?.status || "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    onDeleteTaskClick(initialData.id);
    onCloseTask();
  };

  return (
    <div className="space-y-4 w-full p-6 bg-sky-100 flex flex-col">
      <div>
        <label className="text-sky-600 font-bold">Nome da Tarefa:</label>
        <input
          disabled={readOnly}
          className="w-full bg-sky-200 p-2 border border-sky-500 rounded-md disabled:opacity-70"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col text-center w-[150px] py-2 border border-gray-500 rounded-tl-lg rounded-bl-lg">
          <label className="text-sky-600 font-bold border-b border-gray-500">Início</label>
          <input
            disabled={readOnly}
            className="mx-2 my-2 bg-sky-200 p-2 border border-sky-500 disabled:opacity-70"
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </div>
        <div className="flex flex-col text-center w-[150px] py-2 border border-gray-500 rounded-tr-lg rounded-br-lg">
          <label className="text-sky-600 font-bold border-b border-gray-500">Conclusão</label>
          <input
            disabled={readOnly}
            className="mx-2 my-2 bg-sky-200 p-2 border border-sky-500 disabled:opacity-70"
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>
      </div>

      <div className="flex w-full items-center justify-between gap-10">
        <div className="flex flex-col w-[50%]">
          <label className="text-sky-600 font-bold">Custo Estimado (R$):</label>
          <div className="flex items-center">
            <span className="text-white rounded-tl rounded-bl w-8 flex items-center justify-center h-10 bg-blue-600 font-bold">R$</span>
            <input
              disabled={readOnly}
              className="w-full px-2 bg-sky-200 p-2 border border-sky-500 rounded-tr-md rounded-br-md disabled:opacity-70"
              type="number"
              value={custo}
              onChange={(e) => setCusto(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col w-[50%]">
          <label className="text-sky-600 font-bold">Status da Tarefa:</label>
          <select
            disabled={readOnly}
            className="w-full px-2 bg-sky-200 p-2 border border-sky-500 rounded-md disabled:opacity-70"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Selecione o status</option>
            <option value="Concluído">Concluído</option>
            <option value="Pendente">Pendente</option>
            <option value="Em andamento">Em andamento</option>
          </select>
        </div>
      </div>

      {!readOnly && (
        <div className={`ml-[50%] pt-8 flex gap-4 ${initialData && "w-full ml-0 justify-center"}`}>
          <button 
            className="flex bg-sky-100 rounded-md shadow-md gap-2 justify-center items-center pr-2 w-fit h-10 text-slate-500 font-semibold"
            onClick={() => {
              if (!title.trim()) {
                setTitle("");
                setDataInicio("");
                setDataFim("");
                setCusto("");
                setStatus("");
              }
              onCloseTask();
            }}
          >
            <Undo2 className="text-white rounded-tl rounded-bl w-8 h-full p-1 bg-blue-600 font-bold"/>
            Voltar
          </button>

          {initialData && (
            <button
              className="flex bg-sky-100 rounded-md shadow-md gap-2 justify-center items-center pr-2 w-fit h-10 text-slate-500 font-semibold"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <TrashIcon className="text-white rounded-tl rounded-bl w-8 h-full p-1 bg-red-600 font-bold" />
              Excluir
            </button>
          )}

          <button
            className="flex bg-sky-100 rounded-md shadow-md gap-2 justify-center items-center pr-2 w-fit h-10 text-slate-500 font-semibold"
            onClick={() => {
              if (!title.trim()) {
                return alert('Preencha o título da tarefa');
              }
              onAddTaskSubmit(title, dataInicio, dataFim, custo, status);
              setTitle("");
              setDataInicio("");
              setDataFim("");
              setCusto("");
              setStatus("");
              onCloseTask();
            }}
          >
            <Save className="text-white rounded-tl rounded-bl w-8 h-full p-1 bg-green-600 font-bold"/>
            {initialData ? "Alterar" : "Salvar"}
          </button>
        </div>
      )}

      {showDeleteConfirm && !readOnly && (
        <div className="bg-red-50 border border-red-300 rounded-md p-4 mt-4">
          <span className="text-red-700 font-semibold block mb-3">
            Deseja excluir esta tarefa?
          </span>
          <div className="flex gap-3">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700"
              onClick={handleDelete}
            >
              Sim
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-semibold hover:bg-gray-400"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Não
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTask;