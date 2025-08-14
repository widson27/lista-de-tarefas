import { PencilIcon, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import AddTask from "./AddTask";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick, onEditTaskClick }) {
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  function toggleExpand(taskId) {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  }

  return (
    <div className="w-full max-w-[500px]">
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="bg-sky-100 shadow-md rounded-md">
            <div className="flex items-center px-4 py-2 border-b border-sky-500">
              <div
                className="flex items-center w-[90%] gap-2 cursor-pointer"
                onClick={() => toggleExpand(task.id)}
              >
                {expandedTaskId === task.id ? (
                  <ChevronDown className="text-sky-600" />
                ) : (
                  <ChevronRight className="text-sky-600" />
                )}
                <span className="text-sky-600 font-bold text-xl">{task.title}</span>
              </div>

              <button
                className="flex bg-sky-100 rounded-md shadow-md gap-2 justify-center items-center pr-2 w-fit h-10 text-slate-500 font-semibold"
                onClick={() => onEditTaskClick(task)}
              >
                <PencilIcon className="text-white rounded-tl rounded-bl w-8 h-full p-1 bg-blue-600 font-bold" />
                Editar
              </button>
            </div>

            {expandedTaskId === task.id && (
              <AddTask initialData={task} readOnly={true} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
