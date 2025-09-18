import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Iconify from "react-native-iconify";
import { useRouter } from "expo-router";
interface ItemCardProps {
  imageUrl: string;
  title: string;
  price: string;
  brand: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  code: string;
  baseUrl: string;
  priceValue: number;
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<{
      price: number;
      code: string;
      url: string;
    }>
  >;
}
const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

const ItemCard = ({
  imageUrl,
  title,
  price,
  brand,
  setShowModal,
  code,
  baseUrl,
  showModal,
  setSelectedProduct,
  priceValue,
}: ItemCardProps) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/(user)/item-page/[code]",
          params: { code },
        });
      }}
      style={{ width: cardWidth }}
      className="mb-4 font-interTight-regular mx-1 relative"
    >
      <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-[199px] rounded-t-2xl bg-top"
          resizeMode="cover"
        />
        <View className="p-3 flex flex-row justify-between">
          <View>
            <Text className="text-gray-500 text-xs mb-1">{brand}</Text>
            <Text className="text-gray-800 font-medium mb-2" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-gray-900 text-lg font-arial-rounded">
              {price}
            </Text>
          </View>
          <TouchableOpacity
            className="bg-[#f6f6f6] rounded-full h-9 w-9 p-1 flex items-center justify-center self-end absolute right-3 bottom-3"
            onPress={() => {
              setShowModal(true);
              setSelectedProduct({
                price: priceValue,
                code,
                url: baseUrl,
              });
            }}
          >
            <Iconify icon="tabler:stack-forward" size={22} color="#ffb677" />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

export default ItemCard;
