import { Task } from "../../types";
import "./taskBoard.css";
import FormNewTask from "./FormNewTask";
import TaskRender from "./TaskRender";

interface Props {
  tasks: Task[];
}

export default function TaskBoard({ tasks }: Props) {
  return (
    <div className="task-board">
      <FormNewTask />

      <div className="tasks">
        {tasks.length === 0 ? (
          <h2>No tasks</h2>
        ) : (
          tasks.map((task) => {
            return <TaskRender task={task} key={task.id} />;
          })
        )}
      </div>
    </div>
  );
}
