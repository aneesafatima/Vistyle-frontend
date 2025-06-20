import React, { useContext, useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "expo-router";
import { Iconify } from "react-native-iconify";
import { router } from "expo-router";
import { GlobalContext } from "@/context/GlobalProvider";
import {
  useSharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import Animated from "react-native-reanimated";

const { width: screenWidth } = Dimensions.get("window");

const DesignStudio = () => {
  const navigation = useNavigation();
  const { userData } = useContext(GlobalContext)!;
  const carouselRef = useRef<ICarouselInstance>(null);
  const progress = useSharedValue(0);

  console.log("User Data in Design Studio:", userData?.stickers);

  // Filter stickers for top category and position
  const topStickers =
    userData?.stickers?.filter((sticker) => sticker.position === "top") || [];
  const bottomStickers =
    userData?.stickers?.filter((sticker) => sticker.position === "middle") ||
    [];
  const shoesStickers =
    userData?.stickers?.filter((sticker) => sticker.position === "bottom") ||
    [];

  // Render item for carousel with animation
  const renderTopItem = ({
    item,
    index,
    animationValue,
  }: {
    item: any;
    index: number;
    animationValue: any;
  }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        animationValue.value,
        [-1, 0, 1],
        [0.7, 1, 0.7]
      );

      const rotateZ = interpolate(
        animationValue.value,
        [-1, 0, 1],
        [-15, 0, 15]
      );

      const opacity = interpolate(
        animationValue.value,
        [-1, 0, 1],
        [0.6, 1, 0.6]
      );

      return {
        transform: [{ scale }, { rotateZ: `${rotateZ}deg` }],
        opacity,
      };
    });

    return (
      <Animated.View
        style={[animatedStyle]}
        className="justify-center bg-purple-300 items-center"
      >
        <Image
          source={{ uri: item.url }}
          className="w-[280px] h-[280px]"
          resizeMode="contain"
        />
      </Animated.View>
    );
  };

  return (
    <View className="bg-white flex-1  pb-6">
      {/* Header */}
      <View className="w-full flex-row justify-between items-center px-4 pt-6">
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

      <View className="bg-blue-200 ">
        {/* Tops Section with Carousel */}
        <View>
          {topStickers.length > 0 && (
            <Carousel
              ref={carouselRef}
              data={topStickers}
              renderItem={renderTopItem}
              width={screenWidth}
              height={250}
              style={{
                width: screenWidth,
              }}
              loop={true}
              autoPlay={false}
              snapEnabled={true}
              onProgressChange={progress}
              mode="horizontal-stack"
              modeConfig={{
                snapDirection: "left",
                stackInterval: 30,
                scaleInterval: 0.08,
                rotateZDeg: 15,
                moveSize: screenWidth * 0.6,
              }}
              customConfig={() => ({ type: "positive", viewCount: 3 })}
              scrollAnimationDuration={300}
            />
          )}
        </View>

        <View className="h-72">
          {bottomStickers.length > 0 && (
            <Carousel
              ref={carouselRef}
              data={bottomStickers}
              renderItem={renderTopItem}
              width={screenWidth}
              height={250}
              style={{
                width: screenWidth,
              }}
              loop={true}
              autoPlay={false}
              snapEnabled={true}
              onProgressChange={progress}
              mode="horizontal-stack"
              modeConfig={{
                snapDirection: "left",
                stackInterval: 30,
                scaleInterval: 0.08,
                rotateZDeg: 15,
                moveSize: screenWidth * 0.6,
              }}
              customConfig={() => ({ type: "positive", viewCount: 3 })}
              scrollAnimationDuration={300}
            />
          )}
        </View>
        {/* 
                <View className="">
          {topStickers.length > 0 && (
            <Carousel
              ref={carouselRef}
              data={topStickers}
              renderItem={renderTopItem}
              width={screenWidth}
              height={320}
              style={{
                width: screenWidth,
              }}
              loop={true}
              autoPlay={false}
              snapEnabled={true}
              onProgressChange={progress}
              mode="horizontal-stack"
              modeConfig={{
                snapDirection: "left",
                stackInterval: 30,
                scaleInterval: 0.08,
                rotateZDeg: 15,
                moveSize: screenWidth * 0.6,
              }}
              customConfig={() => ({ type: "positive", viewCount: 3 })}
              scrollAnimationDuration={300}
            />
          )}
        </View> */}

        {/* Jeans - keeping original implementation */}
        {/* <View className="flex-row justify-center items-center w-full bg-yellow-50">
          <Image
            source={require("../../assets/images/bottom-1.png")}
            className="w-60 h-60"
          />
        </View> */}

        {/* Shoes - keeping original implementation */}
        {/* <View className="flex-row justify-center items-center w-full">
          <Image
            source={require("../../assets/images/shoes-1.png")}
            className="w-28 h-28"
          />
        </View> */}
      </View>

      {/* Footer Buttons */}
      <View className="flex-row justify-between w-full px-6 mt-4 place-self-end">
        <TouchableOpacity className="bg-[#fde0ca] p-3 rounded-full">
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
