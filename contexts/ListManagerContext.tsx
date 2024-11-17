import { createContext } from "react";

type listManagerContextType = {
  isListRendered: boolean;
  handleClick: () => void;
  clickCounter: number;
};

export const ListManagerContext = createContext<listManagerContextType>({
  isListRendered: false,
  handleClick: () => {},
  clickCounter: 0,
});
