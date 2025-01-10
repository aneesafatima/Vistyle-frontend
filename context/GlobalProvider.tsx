import { createContext, useState } from "react";
type GlobalContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userData:userDataType | null;
  setUserData: React.Dispatch<React.SetStateAction<userDataType | null>>
};

type userDataType ={
name: "string",
email: "string"
}
export const GlobalContext = createContext<GlobalContextType | null>(null)!;

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<null | userDataType>(null);
  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
