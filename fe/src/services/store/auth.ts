import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = { accessToken: string | null };
type Action = {
  setAccessToken: (accessToken: string) => void;
};

export const useAuth = create<State & Action>()(
  immer((set) => ({
    accessToken: null,

    setAccessToken: (payload: string) =>
      set((state: State) => (state.accessToken = payload)),
  }))
);
