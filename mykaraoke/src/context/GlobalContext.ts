import { createContext } from "react";

export interface IUser {
  username: string;
  email: string;
}

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const GlobalContext = createContext<IUserContext | undefined>(undefined);
export default GlobalContext;
