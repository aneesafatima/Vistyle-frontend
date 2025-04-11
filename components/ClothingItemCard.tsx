import React from "react";
import { View, Text, Image, Pressable } from "react-native";

type ItemProps = {
  name: string;
  price: string;
  image: string;
};

const ShoppingItemCard = ({item}: {item: ItemProps}) => {
  return (
    <View className="bg-white rounded-xl shadow-md p-4 m-2 w-60">
      <Image
        source={{ uri: item.image }}
        className="h-40 w-full rounded-lg mb-3"
        resizeMode="contain"
      />
      <Text className="text-lg font-bold text-gray-800 mb-1">{item.name}</Text>
      <Text className="text-base text-gray-600 mb-3">{item.price}</Text>
      <Pressable className="bg-blue-600 py-2 rounded w-52">
        <Text className="text-white text-center font-semibold">Design</Text>
      </Pressable>
    </View>
  );
};

export default ShoppingItemCard;
