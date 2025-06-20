import { useContext, useEffect, useState } from "react";
import { Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { Link, router } from "expo-router";
import * as Font from "expo-font";
import { GlobalContext } from "@/context/GlobalProvider";
import { useTokenStatusQuery } from "@/query/features/authApi";
import { getToken } from "@/utils/storage";

const HomePage = () => {
  //fix styling in otp page
  //remove back button from some pages
  console.log("In Main Page");
  const [isLoading, setIsLoading] = useState(true);
  const { setIsLoggedIn, setToken, token, setUserData } =
    useContext(GlobalContext)!;
  const { data } = useTokenStatusQuery(token as string, {
    skip: !token,
  });
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "poppins-medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "interTight-bold": require("../assets/fonts/InterTight-Bold.ttf"),
        "interTight-medium": require("../assets/fonts/InterTight-Medium.ttf"),
        "interTight-regular": require("../assets/fonts/InterTight-Regular.ttf"),
        "freckle-face": require("../assets/fonts/FreckleFace-Regular.ttf"),
        georgia: require("../assets/fonts/NotoSansGeorgian-VariableFont_wdth,wght.ttf"),
        "arial-rounded" : require("../assets/fonts/Arial-rounded.ttf")
      });
    };

    getToken().then((val) => {
      val && setToken(val);
    });
    if (data) {
      console.log("Token Status Data:", data);
      setUserData({
        name: data.user.name,
        email: data.user.email,
        interests: data.user.interests,
        username: data.user.username,
        description: data.user.description,
        designHouse: data.user.designHouse,
        id: data.user.id,
        stickers: data.user.stickers
      });
      setIsLoggedIn(true);
      router.navigate("/(user)/home");
    } else {
      setIsLoading(false);
    }

    loadFonts();
  }, [data]);
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      {isLoading ? (
        <View className="flex-1 justify-center items-center bg-white">
          <Text>LOADING...</Text>
        </View>
      ) : (
        <View className="text-center">
          <Text className="text-4xl font-semibold text-center">ColorMind</Text>
          <Text className="mt-4 text-lg font-medium text-center">
            Welcome to ColorMind, your AI-powered space for personalized
            clothing and accessory recommendations.
          </Text>

          {/* Explore Button */}
          <View className="mx-auto mt-4">
            <Pressable
              className="bg-black rounded-lg"
              onPress={() => router.replace("/(auth)/login")}
            >
              <Text className="text-white p-3  text-lg font-medium text-center">
                Explore
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomePage;
