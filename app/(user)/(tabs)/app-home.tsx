import { useContext, useState } from "react";
import { StatusBar, Touchable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalContext } from "@/context/GlobalProvider";
import { HomeContent, ShopContent, Header } from "@/components";

const HomePage = () => {
  const { isLoggedIn } = useContext(GlobalContext)!;
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  return (
    isLoggedIn && (
      <SafeAreaView className="flex-1 flex-col bg-[#fafafa]">
        <StatusBar
          barStyle="dark-content"
          translucent={false}
          backgroundColor="#fafafa"
        />
        <Header
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        {isSearching ? (
          <ShopContent searchText={searchText} setSearchText={setSearchText} />
        ) : (
          <HomeContent />
        )}
      </SafeAreaView>
    )
  );
};

export default HomePage;
