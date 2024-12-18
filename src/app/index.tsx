import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import '../../global.css'

const index = () => {
  return (
    <SafeAreaView>
      <View className="bg-red-300" >
        <Text className="text-red-600">ColorMind Home page!!</Text>

      </View>
    </SafeAreaView>
  );
};

export default index;
