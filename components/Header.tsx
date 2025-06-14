import {
  View,
  Text,
  Image,
  Pressable,
  Animated,
  Dimensions,
  Easing,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "@/context/GlobalProvider";
import Iconify from "react-native-iconify";

const Header = ({
  isSearching,
  setIsSearching,
  setSearchText,
  searchText,
}: {
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchText: string;
}) => {
  const { width: screenWidth } = Dimensions.get("window");
  const widthAnim = useRef(new Animated.Value(60)).current; // initial width of button

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: isSearching ? screenWidth - 32 : 60, // expand to 200 when searching
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isSearching]);

  const animatedStyle = {
    width: widthAnim,
  };
  const { userData } = useContext(GlobalContext)!;
  return (
    <View className="relative  pt-6 flex flex-row items-center justify-between px-4">
      {!isSearching && (
        <View className="flex flex-row items-center">
          <Image
            className="w-16 h-16 rounded-full bg-pink-100 bg-contain"
            source={require("../assets/images/avatar-pfp.jpg")}
          />
          <View className="ml-3">
            <Text className="text-xl font-semibold font-interTight-bold">
              Hello, {userData?.name}
            </Text>
            <Text className="text-gray-500 text-xs">
              {userData?.designHouse}
            </Text>
          </View>
        </View>
      )}

      <Animated.View
        style={[
          {
            height: 60,
            borderRadius: 32,
            borderWidth: 1,
            borderColor: "#D1D5DB",
            backgroundColor: "#fff",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 10,
            position: "absolute",
            right: 16,
            top: 24,
            overflow: "hidden",
          },
          animatedStyle,
        ]}
      >
        {isSearching && (
          <TextInput
            className="flex-1 h-full pl-6 font-interTight-regular"
            placeholder="Search for your favorite products"
            placeholderTextColor={"#e3e3e3"}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        )}

        <Pressable
          onPress={() => setIsSearching((prev) => !prev)}
          className="absolute right-[13px]"
        >
          <Iconify
            icon="mdi-light:magnify"
            width={30}
            height={30}
            color={"gray"}
          />
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default Header;
