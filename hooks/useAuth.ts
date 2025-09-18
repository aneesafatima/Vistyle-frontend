import { useContext } from "react";
import { saveToken, removeToken } from "@/utils/storage";
import { GlobalContext } from "@/context/GlobalProvider";
import { useRouter } from "expo-router";
import { LoginResponseType } from "@/types/auth";
const useAuth = () => {
  const { setIsLoggedIn, setUserData, setToken, setCart } = useContext(GlobalContext)!;
  const router = useRouter();

  // Function (optional)
  const loggingUserIn = async (result: LoginResponseType) => {
    await saveToken(result["token"]);
    setIsLoggedIn(true);
    setUserData({
      name: result.user.name,
      email: result.user.email,
      interests: result.user.interests,
      username: result.user.username,
      description: result.user.description,
      designHouse: result.user.designHouse,
      id: result.user.id,
      stickers: result.user.stickers
    });
    setCart(result.user.cart || []);
    router.replace("/(user)/(tabs)/home");
  };

  const loggingUserOut = () => {
    removeToken().then(() => {
      setUserData(null);
      setIsLoggedIn(false);
      setToken(null);
      router.replace("/");
    });
  };

  return { loggingUserIn, loggingUserOut };
};

export default useAuth;
