import { useState } from "react";
import { auth } from "../../firebase/connection";
import { onAuthStateChanged } from "firebase/auth";
import { createTask, getTasks } from "../../firebase/firestore";
import { Task } from "../../types";
import { useTaskStore } from "../../store/taskStore";
import "./formNewTask.css";

export default function FormNewTask() {
  const { setTasks } = useTaskStore((state) => ({
    setTasks: state.setTask,
  }));

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [nameError, setNameError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);

  const [createdStatus, setCreatedStatus] = useState<string>("");
  const [_, setLoader] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nameRegex = /^.{4,15}$/;
    const descriptionRegex = /^.{5,30}$/;

    const nameRegexValidation = nameRegex.test(name);
    const descriptionRegexValidation = descriptionRegex.test(description);

    if (nameRegexValidation) {
      setNameError(false);
    } else {
      setNameError(true);
    }

    if (descriptionRegexValidation) {
      setDescriptionError(false);
    } else {
      setDescriptionError(true);
    }

    if (descriptionRegexValidation && nameRegexValidation) {
      onAuthStateChanged(auth, (user) => {
        if (user?.email) {
          const task: Task = {
            id: crypto.randomUUID(),
            author: user.email,
            name,
            description,
          };

          createTask(task, setCreatedStatus);
          getTasks(setTasks, setLoader, user.email);
        }
      });
      setName("");
      setDescription("");
    }
  }

  return (
    <form className="new-task" onSubmit={handleSubmit}>
      <label className={nameError ? "error" : undefined}>
        {nameError ? "Invalid name" : "Task name"}
      </label>
      <input
        type="text"
        placeholder="Take a walk..."
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label className={descriptionError ? "error" : undefined}>
        {descriptionError ? "Invalid description" : "Task description"}
      </label>
      <input
        type="text"
        placeholder="I will take a walk at 8:00AM"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <button>Add</button>
    </form>
  );
}

/*
TASK TO FINISH THIS CODE: 

1. Render all the tasks.
2. Create the form to add new tasks (and validate its data) DONE

Follow the figma designs.
*/
