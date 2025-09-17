import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  FlatList,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useProductDetailQuery } from "@/query/features/hmApi";
import { useLocalSearchParams } from "expo-router";
import Iconify from "react-native-iconify";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const ItemPage = () => {
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { code: itemId } = useLocalSearchParams<{ code: string }>();
  // const { data, isLoading, error } = useProductDetailQuery(itemId);

  console.log("In Item page")

  // Demo images array - using the same image 3 times as requested
  const demoImages = [
    require("../../../assets/images/item-img-demo.jpg"),
    require("../../../assets/images/item-img-demo.jpg"),
    require("../../../assets/images/item-img-demo.jpg"),
  ];

  // useEffect(() => {
  //   if (data) {
  //     console.log("Product Detail Data:", data);
  //   }
  // }, [data]);

  const demoColors = [
    "#FF5733", // Red
    "#33FF57", // Green
    "#3357FF", // Blue
    "#F1C40F", // Yellow
    "#9B59B6", // Purple
  ];

  const renderCarouselItem = ({
    item,
    index,
  }: {
    item: number;
    index: number;
  }) => (
    <View className="flex-1">
      <Image source={item} className="w-full h-full" resizeMode="cover" />
    </View>
  );

  const renderPaginationDots = () => (
    <View className="flex-row justify-center items-center absolute bottom-3 left-0 right-0">
      {demoImages.map((_, index) => (
        <View
          key={index}
          className={`w-2 h-2 rounded-full mx-1 ${
            index === currentImageIndex ? "bg-white" : "bg-white/50"
          }`}
        />
      ))}
    </View>
  );

  // if (isLoading) {
  //   return (
  //     <View className="flex-1 items-center justify-center bg-[#FAFAFA]">
  //       <Text className="text-xl font-semibold">Loading...</Text>
  //     </View>
  //   );
  // }

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      {/* Image Carousel */}
      <View className="w-full h-[55vh] relative">
        <Carousel
          loop
          width={screenWidth}
          height={0.55 * screenHeight}
          data={demoImages}
          scrollAnimationDuration={500}
          renderItem={renderCarouselItem}
          onSnapToItem={(index) => setCurrentImageIndex(index)}
        />
        {renderPaginationDots()}
      </View>

      {/* Filter Panel */}
      <ScrollView
        className=" bg-white p-5 h-[45vh] px-10 flex flex-col"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-arial-rounded font-semibold">
            Strappy bodycon dress
          </Text>
          <Text className="text-[#737373] text-sm font-poppins-medium">
            $49.99
          </Text>
        </View>
        <Text className="text-[#919191] text-xs font-poppins-medium my-4">
          Elevate your space with the GlowMate Smart Lamp — a sleek, modern
          lighting solution designed for comfort, style, and convenience.
          Featuring customizable colors, touch-sensitive controls, and seamless
          integration with smart home systems, the GlowMate adapts to your mood,
          schedule, and lifestyle. Whether you're winding down for the night or
          brightening up your workspace, this lamp offers the perfect ambiance
          at the tap of a finger.
        </Text>
        <View>
          <TouchableOpacity className="bg-black px-4 py-2 rounded items-center active:opacity-80 w-1/2">
            <Text className="text-white text-sm">Add to Cart</Text>
          </TouchableOpacity>
            <Pressable className="flex-row items-center px-4 py-2 rounded bg-transparent active:opacity-70">
      <Text className="text-sm text-black mr-2">Visit</Text>
      <Iconify icon="mdi:link-variant" width={18} height={18} color="#000" />
    </Pressable>
        </View>
        <View className="">
          <Text className="text-3xl font-arial-rounded font-semibold text-center pt-3 mb-5">
            Filter
          </Text>

          {/* Size Filter */}
          <View className="mb-4 bg-[#ffb677] h-20 rounded-r-full rounded-l-full flex-row items-center justify-between px-2">
            {selectedSize && (
              <Pressable
                className={`w-16 h-16 rounded-full flex justify-center items-center bg-[#fafafa]`}
              >
                <Text className="font-semibold font-poppins-medium text-xl text-[#222831]">
                  {selectedSize}
                </Text>
              </Pressable>
            )}
            <View className="flex-row">
              {["XS", "S", "M", "L"]
                .filter((size) => size != selectedSize)
                .map((size, index) => (
                  <Pressable
                    key={index}
                    onPress={() => setSelectedSize(size)}
                    className={`w-16 h-16 rounded-full flex justify-center items-center -ml-3 bg-[#ffffff38]`}
                  >
                    <Text className="font-semibold text-white font-poppins-medium text-xl">
                      {size}
                    </Text>
                  </Pressable>
                ))}
            </View>
          </View>

          {/* Color Filter */}
          <View className="mb-4 bg-[#f2f2f2] flex-grow  p-8 rounded-[40px]">
            <View>
              <Text className="text-xl font-medium font-arial-rounded">
                Color
              </Text>
              <Text className="text-[#b6b6b6]">5 available</Text>
            </View>
            <FlatList
              data={demoColors}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ gap: 16, marginTop: 12 }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setSelectedColor(item)}
                  className="w-16 h-16 rounded-full justify-center items-center"
                  style={{
                    backgroundColor: item,
                    borderWidth: selectedColor === item ? 2 : 0,
                    borderColor: "#222831",
                  }}
                >
                  <View></View>
                </Pressable>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemPage;
