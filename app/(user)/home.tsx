import React, { useState, useEffect, useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalContext } from "@/context/GlobalProvider";
import { removeToken } from "@/utils/storage";
import { router } from "expo-router";

const HomePage = () => {
  const { isLoggedIn, userData, setIsLoggedIn, setUserData, setToken } =
    useContext(GlobalContext)!;
  console.log("in home page", isLoggedIn);
  useEffect(() => {
    // const fetchUser = async () => {
    //   try {
    //     const userData = await AsyncStorage.getItem("user");
    //     if (userData) {
    //       const parsedUser = JSON.parse(userData);
    //       // Remove password from the parsed user data
    //       const { password, passwordConfirm, ...userWithoutPassword } = parsedUser;
    //       setUser(userWithoutPassword); // Update state without password
    //     }
    //   } catch (error) {
    //     console.error("Failed to fetch user data:", error);
    //   }
    // };
    // fetchUser();
  }, []);

  console.log();

  return (
    isLoggedIn && (
      <SafeAreaView className="flex-1 items-start bg-white">
        <View className="text-center mt-[1rem] p-4">
          <Text className="text-4xl font-semibold">Hello {userData?.name}</Text>
          <Pressable
            onPress={() => {
              removeToken().then(() => { setUserData(null);
                setIsLoggedIn(false);
                setToken(null);
                router.replace("/login");});
             
            }}
          >
            <Text className="text-blue-500">Logout</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    )
  );
};

export default HomePage;
