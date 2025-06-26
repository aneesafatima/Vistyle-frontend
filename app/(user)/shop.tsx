import { GlobalContext } from "@/context/GlobalProvider";
import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Iconify } from "react-native-iconify";

const cartItems = [
  {
    id: 1,
    title: "SNOWY FOR WOMAN",
    price: 687,
    sizes: ["S", "M", "L"],
    image: require("../../assets/images/top-1.png"),
  },
  {
    id: 2,
    title: "YELLOW NEW HOODIE",
    price: 563,
    sizes: ["S", "XXL"],
    image: require("../../assets/images/top-1.png"),
  },
  {
    id: 3,
    title: "RAINY NEW CLOTHE",
    price: 790,
    sizes: ["S", "M", "L", "XL"],
    image: require("../../assets/images/top-1.png"),
  },
];

export default function CartScreen() {
  const { userData } = useContext(GlobalContext)!;
  return (
    <View className="flex-1 bg-white ">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4 pt-14 px-9">
        <Text className="text-4xl font-medium font-arial-rounded">MY CART</Text>

        <View className="bg-[#9eadffd9] px-3 py-1 rounded-full">
          <Text className="text-lg font-bold text-white">
            {userData?.cart?.length}
          </Text>
        </View>
      </View>

      <Text className="text-gray-500 mb-10 font-arial-rounded text-xl px-9">
        BEST COLLECTION!
      </Text>

      {/* Cart Items */}
      <ScrollView className="flex-1 mb-6 px-9">
        {userData?.cart?.map((item, i) => (
          <View key={i} className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center justify-between gap-4 w-full">
              <Image
                source={{ uri: item.url }}
                className="w-36 h-36 rounded-3xl"
                resizeMode="cover"
                alt={item.title}
              />
              <View className="flex justify-evenly h-full ">
                <Text className="text-[#9b9b9b] font-arial-rounded">{`0${
                  i + 1
                }`}</Text>
                <Text className="font-semibold font-arial-rounded  text-wrap">
                  {item.title.toUpperCase()}
                </Text>
                <Text className="text-sm text-gray-500 mt-1 font-arial-rounded">
                  SIZE: {item.size.join(" ")}
                </Text>
                <Text className="text-base mt-1 font-arial-rounded">
                  Rs {item.price}
                </Text>
              </View>
              <View className="items-center w-10">
                <Iconify icon="mdi:minus" size={25} color="#222831" />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      {/* Footer */}
      <View
        style={{ backgroundColor: "#222831" }}
        className="p-5 rounded-t-[40px]"
      >
        <View className="flex-row justify-between items-center py-4 px-4">
          <Text className="text-[#e3e3e387] text-base">SUBTOTAL</Text>
          <Text className="text-[#f9f9f9] font-arial-rounded text-xl ">
            Rs{" "}
            {userData?.cart
              ?.reduce((sum, item) => sum + item.price, 0)
              .toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}
