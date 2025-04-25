import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useRemoveBackgroundQuery } from "../query/features/imageApi";
import useImageProcessing from "@/lib/skia";

type ItemProps = {
  name: string;
  price: string;
  image: string;
};
const ShoppingItemCard = ({ item }: { item: ItemProps }) => {
  const [stickerStatus, setStickerStatus] = useState(false);
  // const {
  //   data: itemImage,
  //   isLoading,
  // } = useRemoveBackgroundQuery(item.image, {
  //   skip: !stickerStatus,
  // });
  const itemImage =
    "https://res.cloudinary.com/dhjykjehw/image/upload/v1745602651/vistyl/test-img2.png";
  const { segmentItem } = useImageProcessing(itemImage, item.image);
  useEffect(() => {
    const doSegmentation = async () => {
      if (itemImage && stickerStatus) {
        //create sticker with the masked image
        console.log("In use effect");
        setStickerStatus(false);
        await segmentItem();
      }
    };
    doSegmentation();
  }, [itemImage, stickerStatus]);

  const createSticker = () => {
    //give a loader to show the creation of sticker
    // if(maskedImage) refetch();
    console.log("In create sticker function");
    setStickerStatus(true);
  };
  return (
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
