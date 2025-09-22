import { createContext, useRef, useState } from "react";
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
    cart: CartItemType[];
    designHouse: string;
    description: string;
  }>;
  cart: CartItemType[];
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  isEditingProfile: boolean;
  setIsEditingProfile: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [cart, setCart] = useState<CartItemType[]>([]);
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
  const [isEditingProfile, setIsEditingProfile] = useState(false);
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
        cart,
        setCart,
        isEditingProfile,
        setIsEditingProfile,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
