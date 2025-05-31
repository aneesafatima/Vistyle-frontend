import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useRemoveBackgroundQuery } from "../query/features/imageApi";
import useImageProcessing from "@/lib/skia";
import { GlobalContext } from "@/context/GlobalProvider";

type ItemProps = {
  name: string;
  price: string;
  image: string;
};
const ShoppingItemCard = ({ item }: { item: ItemProps }) => {
  const { userData } = useContext(GlobalContext)!;
  const [stickerStatus, setStickerStatus] = useState(false);
  const { data } = useRemoveBackgroundQuery(
    { imgURL: item.image, email: userData?.email || "" },
    {
      skip: !stickerStatus,
    }
  );
  // const { segmentItem } = useImageProcessing(data?.imgUrl || "", setStickerStatus);//change its structure
  const { segmentItem } = useImageProcessing("https://res.cloudinary.com/dhjykjehw/image/upload/v1748521687/vistyl/test-img2.png" || "", setStickerStatus);//change its structure

  useEffect(() => {
    // const doSegmentation = () => {
    //   if (stickerStatus && data?.imgUrl) {
    //     console.log("In useEffect: ", data.imgUrl);
    //     segmentItem();
    //     setStickerStatus(false);
    //   }
    // };
    // doSegmentation();
  }, [stickerStatus, data]);

  const createSticker = () => {
    setStickerStatus(true);
  };
  return stickerStatus ? (
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
