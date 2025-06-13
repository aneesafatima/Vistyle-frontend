import { useContext, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalContext } from "@/context/GlobalProvider";
import useAuth from "@/hooks/useAuth";
import { HomeContent, ShopContent, Header } from "@/components";

const HomePage = () => {
  const { isLoggedIn, userData } = useContext(GlobalContext)!;
  const { loggingUserOut } = useAuth();
  const [isSearching, setIsSearching] = useState(false);
  return (
    isLoggedIn && (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar
          barStyle="dark-content"
          translucent={false}
          backgroundColor="white"
        />
        <Header isSearching={isSearching} setIsSearching={setIsSearching} />
        {
          isSearching ? (
            <ShopContent />
          ) : (
            <HomeContent />
          )
        }
      </SafeAreaView>
    )
  );
};

export default HomePage;
