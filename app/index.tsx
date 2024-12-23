import React from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { Link } from "expo-router";

const HomePage = () => {
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
            <View
              style={{
                paddingHorizontal: 24,
                paddingVertical: 10,
                backgroundColor: "#000",
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
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
