import { useContext, useEffect, useState } from "react";
import { StatusBar, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { router } from "expo-router";
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
import SignUp from "./(auth)/sign-up";
import LogIn from "./(auth)/login";
import ResetPasswordScreen from "./(auth)/forgot-password";
import { HouseSelector } from "@/components";
const HomePage = () => {
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
      authenticate ? -(screenHeight - (1 / 5) * screenHeight) : 0,
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
    <SafeAreaView className="justify-center items-center bg-[#FAFAFA] relative">
      {/* <ScrollView> */}
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="#FAFAFA"
      />
      <Animated.View
        style={[
          animatedStyle,
          {
            height: screenHeight,
            overflow: showAuthenticationScreen ? "visible" : "hidden",
          },
        ]}
      >
        <View
          className="flex-row flex-wrap justify-center p-4 "
          style={{ height: screenHeight - (1 / 6) * screenHeight }}
        >
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
          className={`flex flex-col items-center justify-center`}
          style={{
            height: showAuthenticationScreen
              ? (1 / 8) * screenHeight
              : (1 / 6) * screenHeight,
            paddingBottom: showAuthenticationScreen ? 10 : 0,
          }}
        >
          <Text className="text-6xl font-interTight-regular font-bold text-[#222831]">
            vistyle<Text className="text-[#9eadffd9]">.</Text>
          </Text>
          {showAuthenticationScreen ? (
            <View className="flex flex-row justify-center w-full ">
              <TouchableOpacity
                onPress={() => {
                  setSelectedScreen("sign-up");
                }}
              >
                <Text
                  className="font-arial-rounded tracking-wider mt-3 mx-10"
                  style={{
                    color:
                      selectedScreen === "sign-up" ||
                      selectedScreen == "house-selection" ||
                      selectedScreen == "interest-selection"
                        ? "#222831"
                        : "#bebebe",
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
                      selectedScreen === "log-in" ||
                      selectedScreen === "forgot-password"
                        ? "#222831"
                        : "#bebebe",
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
        {showAuthenticationScreen &&
          (selectedScreen === "sign-up" ? (
            <SignUp setSelectedScreen={setSelectedScreen} />
          ) : selectedScreen === "forgot-password" ? (
            <ResetPasswordScreen />
          ) : selectedScreen === "log-in" ? (
            <LogIn setSelectedScreen={setSelectedScreen} />
          ) : selectedScreen === "house-selection" ? (
            <HouseSelector />
          ) : (
            <Text>Screen yet to be made</Text>
          ))}
      </Animated.View>

      <TouchableOpacity
        className="absolute top-10 right-0 bg-[#9eadffd9] p-3 rounded-full"
        onPress={() => {
          handleAuthenticationScreen();
        }}
      >
        <Text>Click me</Text>
      </TouchableOpacity>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default HomePage;
