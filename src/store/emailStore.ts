import { create } from "zustand";

interface State {
  email: string;
  setEmail: (newEmail: string) => void;
}

export const useEmailStore = create<State>((set) => ({
  email: "",
  setEmail: (newEmail) =>
    set(() => ({
      email: newEmail,
    })),
}));
