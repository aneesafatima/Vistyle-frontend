import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IUser {
  name: string;
  email: string;

}

const HomePage = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          // Remove password from the parsed user data
          const { password, passwordConfirm, ...userWithoutPassword } = parsedUser;
          setUser(userWithoutPassword); // Update state without password
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView className="flex-1 items-start bg-white">
      <View className="text-center mt-[1rem] p-4">
        <Text className="text-4xl font-semibold">ColorMind</Text>
        {user ? (
          <Text className="mt-4 text-lg font-medium text-center">
            Welcome to ColorMind, your name is {user.name} and email is {user.email}
          </Text>
        ) : (
          <Text className="mt-4 text-lg font-medium text-center">
            Loading user data...
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
