import { createContext, useState } from "react";
import { SkImage } from "@shopify/react-native-skia";
type GlobalContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userData: userDataType | null;
  setUserData: React.Dispatch<React.SetStateAction<userDataType | null>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

type userDataType = {
  name: "string";
  email: "string";
  interests: string[];
};
export const GlobalContext = createContext<GlobalContextType | null>(null)!;

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<null | userDataType>(null);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        email,
        setEmail,
        token,
        setToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
