import { createContext, useRef, useState } from "react";
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
  updatedUserData: updatedUserDataType | null;
  setUpdatedUserData: React.Dispatch<
    React.SetStateAction<updatedUserDataType | null>
  >;
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  makeSearch: boolean;
  setMakeSearch: React.Dispatch<React.SetStateAction<boolean>>;
  signUpData: React.MutableRefObject<{
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    username: string;
    interests: string[];
    cart: never[];
    designHouse: string;
    description: string;
  }>;
};

export const GlobalContext = createContext<GlobalContextType | null>(null)!;

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<userDataType | null>(null);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [updatedUserData, setUpdatedUserData] =
    useState<null | updatedUserDataType>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [makeSearch, setMakeSearch] = useState(false);
  const signUpData = useRef({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    username: "",
    interests: [],
    cart: [],
    designHouse: "" as DesignHouse,
    description: "",
  });

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
        updatedUserData,
        setUpdatedUserData,
        showAlert,
        setShowAlert,
        makeSearch,
        setMakeSearch,
        signUpData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
