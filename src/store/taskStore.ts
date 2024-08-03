import { create } from "zustand";
import { Task } from "../types";

interface State {
  tasks: Task[];
  setTask: (task: Task[]) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Task) => void;
}

export const useTaskStore = create<State>((set) => ({
  tasks: [],
  setTask: (task) =>
    set(() => ({
      tasks: task,
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  updateTask: (id, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
    })),
}));
