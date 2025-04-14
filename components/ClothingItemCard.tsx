import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useMaskedImageQuery } from "../query/features/imageApi";

type ItemProps = {
  name: string;
  price: string;
  image: string;
};
const ShoppingItemCard = ({ item }: { item: ItemProps }) => {
  const [stickerStatus, setStickerStatus] = useState(false);
  const { data: maskedImage, isLoading } = useMaskedImageQuery(item.image, {
    skip: !stickerStatus,
  });
  useEffect(() => {
    console.log("In useEffect", maskedImage);
    if (maskedImage) {
      console.log(maskedImage);
      //create sticker with the masked image
      setStickerStatus(false);
    }
  }, [maskedImage]);

  const createSticker = () => {
    //give a loader to show the creation of sticker
    setStickerStatus(true);
  };
  return isLoading ? (
    <View>
      <Text>Loading...</Text>
    </View>
  ) : (
    <View className="bg-white rounded-xl shadow-md p-4 m-2 w-60">
      <Image
        source={{ uri: item.image }}
        className="h-40 w-full rounded-lg mb-3"
        resizeMode="contain"
      />
      <Text className="text-lg font-bold text-gray-800 mb-1">{item.name}</Text>
      <Text className="text-base text-gray-600 mb-3">{item.price}</Text>
      <Pressable
        className="bg-blue-600 py-2 rounded w-52"
        onPress={createSticker}
      >
        <Text className="text-white text-center font-semibold">Design</Text>
      </Pressable>
    </View>
  );
};

export default ShoppingItemCard;
