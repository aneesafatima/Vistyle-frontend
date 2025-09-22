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
  ActivityIndicator,
  Alert,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useProductDetailQuery } from "@/query/features/hmApi";
import { Link, useLocalSearchParams } from "expo-router";
import Iconify from "react-native-iconify";
import { useAddToCartMutation } from "@/query/features/productApi";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalProvider";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const ItemPage = () => {
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { code: itemId } = useLocalSearchParams<{ code: string }>();
  const { data, isLoading, error } = useProductDetailQuery(itemId);
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
  const [addToCart, { isLoading: isAddingToCart, isSuccess }] =
    useAddToCartMutation();
  const { userData, cart, setCart } = useContext(GlobalContext)!;

  const images: string[] | null =
    data?.product.articlesList
      .find((item) => item.code === itemId)
      ?.galleryDetails.map((img: any) => img.baseUrl) || null;

  const renderCarouselItem = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => (
    <View className="flex-1">
      <Image
        source={{ uri: item }}
        className="w-full h-full"
        resizeMode="cover"
      />
    </View>
  );

  const renderPaginationDots = () => (
    <View className="flex-row justify-center items-center absolute bottom-3 left-0 right-0">
      {images?.map((_, index) => (
        <View
          key={index}
          className={`w-2 h-2 rounded-full mx-1 ${
            index === currentImageIndex ? "bg-white" : "bg-white/50"
          }`}
        />
      ))}
    </View>
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="small" color="gray" />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View className="flex-1 justify-center items-center px-10">
        <Text className="text-center text-gray-500">
          Failed to load product details. Please try again later.
        </Text>
      </View>
    );
  }

  const handleAddToCart = async (item: CartItemType) => {
    try {
      const data = await addToCart({
        code: itemId,
        email: userData?.email || "",
        size: selectedSize!,
        price: item.price,
        title: item.title,
        url: item.url,
        img: item.img,
      }).unwrap();
      setCart([...cart, data.cart]);
    } catch (error) {
      Alert.alert("Error", "Failed to add item to cart. Please try again.");
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      {/* Image Carousel */}
      <View className="w-full h-[55vh] relative">
        <Carousel
          loop
          width={screenWidth}
          height={0.55 * screenHeight}
          data={images || []}
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
        <View className="flex-col  justify-around">
          <Text className="text-2xl font-arial-rounded font-semibold">
            {data.product.name}
          </Text>

          <Text className="text-[#737373] text-sm font-poppins-medium mt-4">
            {data.product.whitePrice.price} {data.product.whitePrice.currency}
          </Text>
          <Text className="text-[#919191] text-xs font-poppins-medium my-4">
            {data.product.description}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            className="bg-black px-4 py-2 rounded items-center active:opacity-80 w-1/2"
            disabled={!selectedSize}
            onPress={() =>
              handleAddToCart({
                code: data.product.code,
                title: data.product.name,
                url: data.product.productUrl,
                price: data.product.whitePrice.price,
                size: selectedSize!,
                img: data.product.articlesList[0].galleryDetails[0].baseUrl,
              })
            }
          >
            <Text className="text-white text-sm">
              {isAddingToCart ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                "Add to Cart"
              )}
            </Text>
          </TouchableOpacity>
          <Pressable className="flex-row items-center px-4 py-2 rounded bg-transparent active:opacity-70">
            <Text className="text-sm text-black mr-1">Visit</Text>
            <Link href={data.product.productUrl}>
              <Iconify
                icon="mdi:link-variant"
                width={18}
                height={18}
                color="#000"
              />
            </Link>
          </Pressable>
        </View>
        <View className="">
          <Text className="text-3xl font-arial-rounded font-semibold text-center pt-0 mb-5">
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
              {(
                data.product.articlesList
                  .find((item) => item.code === itemId)
                  ?.variantsList?.map((variant: any) => variant?.size?.name) ||
                []
              )
                .filter((size: string) => size != selectedSize)
                .map((size: string, index: number) => (
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
              data={
                data.product.articlesList.map((item) => item.color.rgbColor) ||
                []
              }
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
