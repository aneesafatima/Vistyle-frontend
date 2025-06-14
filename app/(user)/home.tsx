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
  const [searchText, setSearchText] = useState("");
  //add shopping categories to the home page
  return (
    isLoggedIn && (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar
          barStyle="dark-content"
          translucent={false}
          backgroundColor="white"
        />
        <Header
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        {isSearching ? <ShopContent   searchText={searchText}
          setSearchText={setSearchText}/> : <HomeContent />}
      </SafeAreaView>
    )
  );
};

export default HomePage;
