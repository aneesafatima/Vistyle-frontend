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

interface ItemCardProps {
  imageUrl: string;
  title: string;
  price: string;
  brand: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

const ItemCard = ({ imageUrl, title, price, brand, setShowModal }: ItemCardProps) => {


  return (
    <View style={{ width: cardWidth }} className="mb-4 font-interTight-regular">
      <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-48 rounded-t-2xl bg-top"
          resizeMode="cover"
        />
        <View className="p-3 flex flex-row justify-between">
          <View>
            <Text className="text-gray-500 text-xs mb-1">{brand}</Text>
            <Text className="text-gray-800 font-medium mb-1" numberOfLines={2}>
              {title}
            </Text>
            <Text className="text-gray-900 text-lg font-arial-rounded">
              {price}
            </Text>
          </View>
          <TouchableOpacity
            className="bg-[#f6f6f6] rounded-full h-10 w-10 p-1 flex items-center justify-center self-end"
            onPress={() => setShowModal(true)}
          >
            <Iconify icon="tabler:stack-forward" size={24} color="#ffb677" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}

    </View>
  );
};

export default ItemCard;
