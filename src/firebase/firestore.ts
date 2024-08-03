import { Task } from "../types";
import { app } from "./connection";
import {
  collection,
  getFirestore,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

const db = getFirestore(app);
const taskCollection = collection(db, "tasks");

export async function getTasks(
  setTasks: (tasks: Task[]) => void,
  setLoader: (val: boolean) => void,
  taskAuthor: string | undefined
) {
  try {
    const tasks: Task[] = [];
    const q = query(taskCollection, where("author", "==", taskAuthor));
    const data = await getDocs(q);

    data.docs.forEach((doc) => {
      tasks.push({
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        author: doc.data().author,
      });
    });

    setTasks(tasks);
    setLoader(true);
  } catch (error: any) {
    alert(error.code);
  }
}

export async function createTask(
  task: Task,
  setTasks: (tasks: Task[]) => void,
  setLoader: (val: boolean) => void,
  taskAuthor: string | undefined
) {
  try {
    await addDoc(taskCollection, task);
  } catch (error: any) {
    alert(error.code);
  }
}

export async function deleteTask(
  taskId: string,
  setTasks: (tasks: Task[]) => void,
  setLoader: (val: boolean) => void,
  taskAuthor: string | undefined
) {
  try {
    const document = doc(db, "tasks", taskId);
    await deleteDoc(document);
    getTasks(setTasks, setLoader, taskAuthor);
  } catch (error: any) {
    alert(error.code);
  }
}
