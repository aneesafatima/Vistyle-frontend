import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import '../global.css'
import { Link } from "expo-router";

const index = () => {
  return (
    <SafeAreaView>
      <View className="" >
      <Link href="/sign-up" ><Text className="text-blue-700 text-3xl">Sign Up</Text></Link>

      </View>
    </SafeAreaView>
  );
};

export default index;
