import { GlobalContext } from "@/context/GlobalProvider";
import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Iconify } from "react-native-iconify";
import { CartItem } from "@/components";

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
        {userData?.cart?.map((item,i) => (
          <CartItem key={i} item={item} i={i} />
        ))}
      </ScrollView>
      {/* Footer */}
      <View
        style={{ backgroundColor: "#222831" }}
        className="p-5 mx-10 mb-10 rounded-[40px]"
      >
        <View className="flex-row justify-between items-center py-4 px-4">
          <Text className="text-[#e3e3e387] text-base">TOTAL</Text>
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
