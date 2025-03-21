import React, { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalContext } from "@/context/GlobalProvider";
import useAuth from "@/hooks/useAuth";

const HomePage = () => {
  const { isLoggedIn, userData, setIsLoggedIn, setUserData, setToken } =
    useContext(GlobalContext)!;
    const { loggingUserOut } = useAuth();
  return (
    isLoggedIn && (
      <SafeAreaView className="flex-1 items-start bg-white">
        <View className="text-center mt-[1rem] p-4">
          <Text className="text-4xl font-semibold">Hello {userData?.name}</Text>
          <Pressable
            onPress={loggingUserOut}
          >
            <Text className="text-blue-500">Logout</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    )
  );
};

export default HomePage;
