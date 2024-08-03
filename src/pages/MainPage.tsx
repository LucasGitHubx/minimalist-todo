import "./mainPage.css";

import { Navigate } from "react-router-dom";
import { useTaskStore } from "../store/taskStore";
import { getTasks } from "../firebase/firestore";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/connection";
import TaskBoard from "../components/tasks/TaskBoard";

export default function MainPage() {
  const [email, setEmail] = useState<string>();
  const [logged, setLogged] = useState<boolean>(true);

  const [loader, setLoader] = useState<boolean>(false);
  const { tasks, setTasks } = useTaskStore((state) => ({
    tasks: state.tasks,
    setTasks: state.setTask,
  }));

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (typeof user?.email === "string") {
        setEmail(user.email);
        getTasks(setTasks, setLoader, user.email);
      }
    });
  }, []);

  async function handleLogOut() {
    await signOut(auth);
    setLogged(false);
  }

  return (
    <>
      {!logged ? <Navigate to="/todo/login" /> : undefined}
      <header>
        <h1>Minimalist todolist</h1>
        <button onClick={() => handleLogOut()}>LogOut</button>
      </header>
      <div className="main-page page">
        <h2>{email} list</h2>
      </div>

      {!loader ? <h2>Loading...</h2> : <TaskBoard tasks={tasks} />}
    </>
  );
}
