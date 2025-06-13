import { View, Pressable } from "react-native";
import React from "react";
import FeatureBox from "./FeatureBox";

const HomeContent = () => {
  return (
    <>
      <View className="w-full h-64 items-center justify-center relative top-10">
        {/* Back Card - Tilted */}
        <View className="w-96 h-60 bg-[#5f5dbd] rounded-[50px] top-6 absolute -rotate-1"></View>

        {/* Front Card */}
        <View className="w-96 h-60 bg-[#a2aff7] rounded-[50px] rotate-3">
          <Pressable className=""></Pressable>
        </View>
      </View>

      <View className="flex-row px-3">
        <FeatureBox
          color="#f1b963"
          icon="material-symbols-light:emoji-people"
          iconColor="#876464"
          borderColor="#d99a3c"
        />
        <FeatureBox
          color="#a2aff7"
          icon="material-symbols-light:info-i-rounded"
          iconColor="#f9f9f9"
          borderColor="#7a86ca"
        />
      </View>
    </>
  );
};

export default HomeContent; 