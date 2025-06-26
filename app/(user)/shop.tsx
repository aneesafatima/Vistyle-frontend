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
  const {userData} = useContext(GlobalContext)!;
  return (
    <View className="flex-1 bg-white pt-10 px-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-xl font-bold">MY CART</Text>
        <View className="flex-row gap-3 items-center">
          <Iconify icon="mdi:lock" size={20} color="#222831" />
          <View className="bg-yellow-400 px-2 py-1 rounded-full">
            <Text className="text-xs font-bold text-white">3</Text>
          </View>
        </View>
      </View>

      <Text className="text-gray-500 mb-4">BEST COLLECTION!</Text>

      {/* Cart Items */}
      <ScrollView className="flex-1 mb-6">
        {userData?.cart.map((item,i) => (
          <View
            key={i}
            className="flex-row items-center justify-between mb-6"
          >
            <View className="flex-row items-center gap-4">
              <Image
                source={{uri: item.url}}
                className="w-16 h-16 rounded-lg"
                resizeMode="cover"
              />
              <View>
                <Text className="font-semibold">{item.title}</Text>
                <Text className="text-sm text-gray-500 mt-1">
                  SIZE: {item.size.join(" ")}
                </Text>
                <Text className="text-base mt-1">${item.price}</Text>
              </View>
            </View>

            <View className="gap-2 items-center">
              <Iconify icon="hugeicons:plus-sign" size={20} color="#222831" />
              <Iconify icon="mdi:minus" size={20} color="#222831" />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={{ backgroundColor: "#222831" }} className="p-5 rounded-t-2xl">
        <View className="flex-row justify-between mb-2">
          <Text className="text-white text-base">SUBTOTAL</Text>
          <Text className="text-white text-base">$2,040.00</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-400 text-base">DISCOUNT</Text>
          <Text className="text-gray-400 text-base">- $80.00</Text>
        </View>
        <View className="flex-row justify-between border-t border-gray-600 pt-2 mt-2">
          <Text className="text-lg text-white font-bold">TOTAL</Text>
          <Text className="text-lg text-yellow-400 font-bold">
            $1,960.00
          </Text>
        </View>
      </View>
    </View>
  );
}
