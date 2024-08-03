import { Task } from "../../types";
import { useState } from "react";
import "./formUpdateTask.css";
import { updateTask } from "../../firebase/firestore";

// Stores
import { useTaskStore } from "../../store/taskStore";
import { useEmailStore } from "../../store/emailStore";

interface Props {
  setEditMode: Function;
  task: Task;
}

export default function FormUpdateTask({ setEditMode, task }: Props) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [_, setLoader] = useState<boolean>(false);

  const { setTasks } = useTaskStore((state) => ({
    setTasks: state.setTask,
  }));
  const { email } = useEmailStore((state) => ({
    email: state.email,
  }));

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nameRegex = /^.{4,15}$/;
    const descriptionRegex = /^.{5,30}$/;

    let nameRegexValidation = nameRegex.test(name);
    let descriptionRegexValidation = descriptionRegex.test(description);

    if (nameRegexValidation && descriptionRegexValidation) {
      const updatedTask: Task = {
        id: task.id,
        name,
        description,
        author: email,
      };

      updateTask(task.id, setTasks, setLoader, email, updatedTask);
      setEditMode(false);
    }
  }

  return (
    <form className="update-task" onSubmit={handleSubmit}>
      <button className="close" onClick={() => setEditMode(false)}>
        x
      </button>
      <div>
        <input
          type="text"
          placeholder="Enter the new name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          placeholder="Enter the new description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <button>Update</button>
    </form>
  );
}
