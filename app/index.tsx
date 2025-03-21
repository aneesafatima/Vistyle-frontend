import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { Link, router } from "expo-router";

import { GlobalContext } from "@/context/GlobalProvider";
import { useTokenStatusQuery } from "@/query/features/authApi";
import { getToken } from "@/utils/storage";

const HomePage = () => {
  //fix styling in otp page
  //remove back button from some pages
  console.log("In Main Page");

  const { setIsLoggedIn, setToken, token } = useContext(GlobalContext)!;
  const { data } = useTokenStatusQuery(token as string, {
    skip: !token,
  });
  useEffect(() => {
    getToken().then((val) => {
      val && setToken(val);
      //set user details in global context
    });
    if (data) {
      setIsLoggedIn(true);
      router.replace("/(user)/home");
    }
  },[data]);
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <View className="text-center">
        <Text className="text-4xl font-semibold text-center">ColorMind</Text>
        <Text className="mt-4 text-lg font-medium text-center">
          Welcome to ColorMind, your AI-powered space for personalized clothing
          and accessory recommendations.
        </Text>

        {/* Explore Button */}
        <View className="mx-auto mt-4">
          <Link href="/login">
            <View className="bg-black rounded-lg">
              <Text className="text-white p-3  text-lg font-medium text-center">
                Explore
              </Text>
            </View>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
