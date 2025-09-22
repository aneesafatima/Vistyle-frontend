import { GlobalContext } from "@/context/GlobalProvider";
import React, { useContext } from "react";
import { View, Text,ScrollView } from "react-native";
import { CartItem } from "@/components";

export default function CartScreen() {
  const {  cart } = useContext(GlobalContext)!;
  return (
    <View className="flex-1 bg-white ">
      {/* Header */}
      <View className="flex-row justify-between items-center h-40 px-9 mb-10">
        <View className="flex-col ">
          <Text className="text-4xl font-medium font-arial-rounded">
            MY CART
          </Text>
          <Text className="text-gray-500 font-arial-rounded text-xl">
            BEST COLLECTION!
          </Text>
        </View>
        <View
          style={{ backgroundColor: "#9eadffd9" }}
          className="w-20 h-20 rounded-full flex items-center justify-center"
        >
          <Text className="text-[#f9f9f9] text-center   font-arial-rounded text-sm ">
            Rs {"\n"}{" "}
            {cart?.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
          </Text>
        </View>
      </View>

      {cart?.length === 0 ? (
        <View className=" absolute w-screen h-screen flex items-center justify-center">
          <Text className="font-arial-rounded text-lg text-gray-300">Your cart is empty</Text>
        </View>
      ) : (
        <ScrollView className="flex-1 mb-6 px-9">
          {cart?.map((item, i) => (
            <CartItem  item={item} i={i} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
