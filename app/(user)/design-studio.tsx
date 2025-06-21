import React, { useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
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
import Alert from "@/components/Alert";
import { CategoryListModal } from "@/components";
const { width: screenWidth } = Dimensions.get("window");

const DesignStudio = () => {
  const navigation = useNavigation();
  const { userData } = useContext(GlobalContext)!;
  const carouselRef = useRef<ICarouselInstance>(null);
  const progress = useSharedValue(0);
  const [showModal, setShowModal] = React.useState(true);
  // Filter stickers for top category and position
  const topStickers =
    userData?.stickers?.filter((sticker) => sticker.position === "top") || [];
  const middleStickers =
    userData?.stickers?.filter((sticker) => sticker.position === "middle") ||
    [];
  const bottomStickers =
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
        className="justify-center items-center"
      >
        <Image
          source={{ uri: item.url }}
          className=""
          style={{
            ...(item.position === "top"
              ? { width: 200, height: 200 }
              : item.position === "middle"
              ? { width: 250, height: 250 }
              : { width: 130, height: 130 }),
          }}
          resizeMode="contain"
        />
      </Animated.View>
    );
  };

  return (
    <View className="bg-[#222831] flex-1">
      {showModal && (
        <CategoryListModal showModal={showModal} setShowModal={setShowModal} />
      )}
      <StatusBar
        backgroundColor={"#222831"}
        barStyle="light-content"
        animated={true}
      />
      {userData?.stickers?.length === 0 && (
        <Alert
          text="No Stickers Found"
          description="You haven't created any stickers yet. Please create some stickers to use in the design studio."
          onAcceptText="Dismiss"
        />
      )}
      {/* Header */}
      <View className="w-full flex-row justify-between items-center px-7 pt-6">
        <TouchableOpacity>
          <Iconify
            icon="icon-park-outline:back"
            size={32}
            color="#9eadffd9"
            className="text-2xl"
          />
        </TouchableOpacity>
        <Text className="text-3xl text-[#9eadffd9] font-interTight-regular">
          Design Studio
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

      <View className="flex-grow items-center justify-center relative">
        {/* Tops Section with Carousel */}
        <View>
          {topStickers.length > 0 && (
            <Carousel
              ref={carouselRef}
              data={topStickers}
              renderItem={renderTopItem}
              width={screenWidth}
              height={180}
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
          {middleStickers.length > 0 && (
            <Carousel
              ref={carouselRef}
              data={middleStickers}
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

        <View className="">
          {bottomStickers.length > 0 && (
            <Carousel
              ref={carouselRef}
              data={bottomStickers}
              renderItem={renderTopItem}
              width={screenWidth}
              height={130}
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
      </View>

      {/* Footer Buttons */}
      <View className="flex-row justify-between w-full px-6 mt-4 absolute bottom-5">
        <TouchableOpacity
          className="bg-[#fde0ca] p-3 rounded-full"
          onPress={() => setShowModal(true)}
        >
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
