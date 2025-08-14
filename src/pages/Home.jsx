import Header from "../components/Header";
import { Plus, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddTask from '../components/AddTask';
import Tasks from '../components/Tasks';
import { v4 } from 'uuid';

function Home() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
  }

  function onCloseTask() {
    setIsAddingTask(false);
    setEditingTask(null);
  }

  function onAddTaskSubmit(title, dataInicio, dataFim, custo, status) {
    if (editingTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id
          ? { ...task, title, dataInicio, dataFim, custo, status }
          : task
      );
      setTasks(updatedTasks);
    } else {
      const newTask = {
        id: v4(),
        title,
        dataInicio,
        dataFim,
        custo,
        status,

      };
      setTasks([...tasks, newTask]);
    }
    onCloseTask();
  }

  return (
    <>
      <Header />

      <div className="h-[100dvh] w-full bg-sky-200 p-6 flex justify-center relative">
        {!isAddingTask && !editingTask && (
          <button
            onClick={() => setIsAddingTask(true)}
            className="flex absolute top-4 right-3 bg-sky-100 rounded-md shadow-md gap-2 justify-center items-center pr-2 w-fit h-10 text-slate-500 font-semibold"
          >
            <Plus className="text-white rounded-tl rounded-bl w-8 h-full bg-blue-600 font-bold" />
            Cadastrar Tarefa
          </button>
        )}

        <div className="flex mt-14 rounded-md w-full max-w-[500px] h-fit py-2 px-2 justify-center">
          <div className="w-full">
            {isAddingTask || editingTask ? (
              <>
                <div className="flex w-full p-2 bg-sky-100 items-center gap-4">
                  <ChevronDown
                    onClick={onCloseTask}
                    className="w-6 font-bold text-sky-600 cursor-pointer"
                  />
                  <h1 className="text-sky-600 font-bold text-2xl">
                    {editingTask ? "Editar Tarefa" : "Nova Tarefa"}
                  </h1>
                </div>
                <AddTask
                  onAddTaskSubmit={onAddTaskSubmit}
                  onCloseTask={onCloseTask}
                  onDeleteTaskClick={onDeleteTaskClick}
                  initialData={editingTask}
                  readOnly={false}
                />
              </>
            ) : (
              <Tasks
                tasks={tasks}
                onDeleteTaskClick={onDeleteTaskClick}
                onEditTaskClick={(task) => {
                  setEditingTask(task);
                  setIsAddingTask(true);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;