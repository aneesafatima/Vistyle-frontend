import { View, Text } from "react-native";
import React from "react";
import { ItemCard } from ".";

const ShopContent = () => {
  return (
    <View className="flex-1 mt-24">
      {/* <Text className="text-xl font-semibold">Shop Content</Text>
      <Text className="text-gray-500">Coming soon...</Text> */}
      <View className="flex-row flex-wrap px-4 gap-4">
  <ItemCard 
    imageUrl="https://image.hm.com/assets/hm/c1/e8/c1e855f6b2d64349d8567e2f56f807182d95e766.jpg?imwidth=1260"
    brand="Nike"
    title="Air Max 270"
    price="$150"
  />
  <ItemCard 
    imageUrl="https://image.hm.com/assets/hm/70/05/700541531ca762398b8b0fb1d3a075533665b1ed.jpg?imwidth=1260"
    brand="Adidas"
    title="Ultraboost 22"
    price="$180"
  />
</View>
    </View>
  );
};

export default ShopContent; 