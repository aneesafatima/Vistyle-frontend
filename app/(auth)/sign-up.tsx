import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
const signUp = () => {
  return (
    <SafeAreaView>
      <View className="">
        <Link href="/reset-password" className="text-2xl text-blue-700">Go to Reset Password Screen</Link>
      </View>
    </SafeAreaView>
  );
};

export default signUp;
