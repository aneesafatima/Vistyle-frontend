import { useContext } from "react";
import { saveToken } from "@/utils/storage";
import { GlobalContext } from "@/context/GlobalProvider";
import { useRouter } from "expo-router"; // Import useRouter from expo-router
import { LoginResponseType } from "@/types/auth";
import { removeToken } from "@/utils/storage";
const useAuth = () => {
  const { setIsLoggedIn, setUserData, setToken } = useContext(GlobalContext)!;
  const router = useRouter();

  // Function (optional)
  const loggingUserIn = async (result: LoginResponseType) => {
    await saveToken(result["token"]);
    console.log("result", result);
    setIsLoggedIn(true);
    setUserData({
      name: result.user.name,
      email: result.user.email,
      interests: result.user.interests,
      username: result.user.username,
      description: result.user.description,
      designHouse: result.user.designHouse,
    });
    router.replace("/(user)/home");
  };

  const loggingUserOut = () => {
    removeToken().then(() => {
      setUserData(null);
      setIsLoggedIn(false);
      setToken(null);
      router.replace("/login");
    });
  };

  // Return values (state & functions)
  return { loggingUserIn,loggingUserOut };
};

export default useAuth;
