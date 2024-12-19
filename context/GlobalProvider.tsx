import { createContext } from "react";
type GlobalContextType = {
  test: string;
};
export const GlobalContext = createContext<GlobalContextType | null>(null)!;

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const test = "Hello from GlobalProvider";
  return (
    <GlobalContext.Provider value={{ test }}>{children}</GlobalContext.Provider>
  );
};
