import "./taskRender.css";
import { Task } from "../../types";
import { auth } from "../../firebase/connection";
import { onAuthStateChanged } from "firebase/auth";
import { deleteTask } from "../../firebase/firestore";
import { useTaskStore } from "../../store/taskStore";
import { useState } from "react";
import FormUpdateTask from "./FormUpdateTask";

interface Props {
  task: Task;
}

export default function TaskRender({ task }: Props) {
  const [_, setLoader] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const { setTasks } = useTaskStore((state) => ({
    setTasks: state.setTask,
  }));

  function handleDelete() {
    onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        deleteTask(task.id, setTasks, setLoader, user.email);
      }
    });
  }

  return (
    <>
      <div className="task">
        <div className="text">
          <p className="name">{task.name}</p>
          <p className="description">{task.description}</p>
        </div>
        <div className="buttons">
          <button className="edit" onClick={() => setEditMode(true)}>
            <img src="public/edit.svg" alt="edit svg" />
          </button>
          <button className="delete" onClick={() => handleDelete()}>
            <img src="public/trash.svg" alt="delete svg" />
          </button>
        </div>

        {editMode ? (
          <FormUpdateTask setEditMode={setEditMode} task={task} />
        ) : undefined}
      </div>
    </>
  );
}

/* 
I MUST FINISH THE MODAL. THE SAME WITH THE CREATESTATUS ON THE ADDNEWTASKFORM.
*/
