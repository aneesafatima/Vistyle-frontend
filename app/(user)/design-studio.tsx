import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import { Iconify } from "react-native-iconify";
import { router } from "expo-router";

const DesignStudio = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-[#F9F9FB] flex-col pb-6  pt-10  px-4">
      {/* Header */}
      <View className="w-full flex-row justify-between items-center px-2 mt-8">
        <TouchableOpacity>
          <Iconify
            icon="icon-park-outline:back"
            size={32}
            color="#9eadffd9"
            className="text-2xl"
          />
        </TouchableOpacity>
        <Text className="text-5xl text-[#9eadffd9] font-freckle-face-regular">
          Design{"\n"}Studio
        </Text>
        <TouchableOpacity onPress={() => router.push("/(user)/design-canvas")}>
          <Iconify
            icon="fluent:design-ideas-20-regular"
            size={37}
            color="#9eadffd9"
            className="text-2xl"
          />
        </TouchableOpacity>
      </View>
      <View className="flex-grow justify-center ">
        {/* Tops Section */}
        <View className="flex-row justify-center items-center w-full mt-3">
          {/* <Image source={{ uri: 'https://link-to-left-top.png' }} className="w-20 h-20" /> */}
          <Image
            source={require("../../assets/images/top-1.png")}
            className="w-56 h-56 "
          />
          {/* <Image source={{ uri: 'https://link-to-right-top.png' }} className="w-20 h-20" /> */}
        </View>

        {/* Jeans */}
        <View className="flex-row justify-center items-center w-full">
          {/* <Image source={{ uri: 'https://link-to-left-jeans.png' }} className="w-24 h-32" /> */}
          <Image
            source={require("../../assets/images/bottom-1.png")}
            className="w-60 h-60"
          />
          {/* <Image source={{ uri: 'https://link-to-right-jeans.png' }} className="w-24 h-32" /> */}
        </View>

        {/* Shoes */}
        <View className="flex-row justify-center items-center w-full ">
          <Image
            source={require("../../assets/images/shoes-1.png")}
            className="w-28 h-28 mt-4"
          />
        </View>
      </View>

      {/* Footer Buttons */}
      <View className="flex-row justify-between w-full px-6 mt-4 place-self-end">
        <TouchableOpacity className="bg-[#fde0ca] p-3  rounded-full">
          <Iconify
            icon="iconamoon:swap-light"
            size={30}
            color="#F06038"
            className="text-2xl"
          />
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#fde0ca] p-3 rounded-full">
          <Iconify
            icon="material-symbols:question-mark-rounded"
            size={30}
            color="#F06038"
            className="text-2xl"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DesignStudio;
