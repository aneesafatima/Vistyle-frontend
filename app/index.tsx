import { useContext, useEffect, useState } from "react";
import {
  Pressable,
  StatusBar,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { Link, router } from "expo-router";
import { GlobalContext } from "@/context/GlobalProvider";
import { useTokenStatusQuery } from "@/query/features/authApi";
import { getToken } from "@/utils/storage";
import { Dimensions } from "react-native";
import { shapeStyles, fontLoader } from "../assets/ui-data/data";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import SignUp from "./(auth)/sign-up";
import LogIn from "./(auth)/login";
import ResetPassword from "./(auth)/forgot-password";
const HomePage = () => {
  //fix styling in otp page
  //remove back button from some pages
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthenticationScreen, setShowAuthenticationScreen] =
    useState(false);
  const [selectedScreen, setSelectedScreen] = useState("sign-up");
  const { setIsLoggedIn, setToken, token, setUserData } =
    useContext(GlobalContext)!;
  const { data } = useTokenStatusQuery(token as string, {
    skip: !token,
  });
  const translate = useSharedValue(0);
  useEffect(() => {
    const loadFonts = async () => {
      await fontLoader();
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
        stickers: data.user.stickers,
        cart: data.user.cart,
      });
      setIsLoggedIn(true);
      router.navigate("/(user)/home");
    } else {
      setIsLoading(false);
    }
    loadFonts();
  }, [data]);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const itemsWidth = screenWidth / 3 - 24;
  const handleAuthenticationScreen = () => {
    const authenticate = !showAuthenticationScreen;
    translate.value = withTiming(
      authenticate ? -(screenHeight - (2 / 5) * screenHeight) : 10,
      {
        duration: 500,
      }
    );
    setShowAuthenticationScreen(authenticate);
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translate.value }],
    };
  });
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#FAFAFA] relative">
      <ScrollView>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor="#FAFAFA"
        />
        <Animated.View style={animatedStyle}>
          <View className="flex-row flex-wrap justify-center p-4   rounded-3xl flex-grow ">
            {shapeStyles.map((item, index) => (
              <View
                key={index}
                style={{
                  width: itemsWidth,
                  height: itemsWidth,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: item.background,
                  ...item.rounded,
                }}
                className={` m-2`}
              >
                {item.path != "" && (
                  <Image
                    source={item.path}
                    style={{ width: 90, height: 90 }}
                    resizeMode="contain"
                  />
                )}
              </View>
            ))}
          </View>
          <View
            className={`flex flex-col items-center justify-center `}
            style={{
              height: showAuthenticationScreen
                ? (1 / 8) * screenHeight
                : (1 / 5) * screenHeight,
            }}
          >
            <Text className="text-6xl font-interTight-regular font-bold text-[#222831]">
              vistyle<Text className="text-[#9eadffd9]">.</Text>
            </Text>
            {showAuthenticationScreen ? (
              <View className="flex flex-row justify-center w-full">
                <TouchableOpacity
                  onPress={() => {
                    setSelectedScreen("sign-up");
                  }}
                >
                  <Text
                    className="font-arial-rounded tracking-wider mt-3 mx-10"
                    style={{
                      color:
                        selectedScreen === "sign-up" ? "#222831" : "#bebebe",
                    }}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedScreen("log-in");
                  }}
                >
                  <Text
                    className="font-arial-rounded tracking-wider mt-3 mx-10"
                    style={{
                      color:
                        selectedScreen === "log-in" ? "#222831" : "#bebebe",
                    }}
                  >
                    Log In
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text className="text-[#bebebe] font-arial-rounded tracking-wider mt-3">
                visualize.style.shop
              </Text>
            )}
          </View>
          {selectedScreen === "sign-up" ? (
            <SignUp />
          ) : selectedScreen === "forgot-password" ? (
            <ResetPassword />
          ) : (
            <LogIn setSelectedScreen={setSelectedScreen} />
          )}
        </Animated.View>

        <TouchableOpacity
          className="absolute top-10 right-0 bg-[#9eadffd9] p-3 rounded-full"
          onPress={() => {
            handleAuthenticationScreen();
          }}
        >
          <Text>Click me</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
