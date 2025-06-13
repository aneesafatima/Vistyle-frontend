import React, { useState } from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import Iconify from "react-native-iconify";
import Modal from "react-native-modal";
import { LinearGradient } from "react-native-linear-gradient";
import {} from "nativewind";
interface ItemCardProps {
  imageUrl: string;
  title: string;
  price: string;
  brand: string;
}

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

const ItemCard = ({ imageUrl, title, price, brand }: ItemCardProps) => {
  const [showModal, setShowModal] = useState(false);

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
      <Modal
        isVisible={showModal}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropColor="black"
        backdropOpacity={0.2}
        coverScreen={true}
        animationInTiming={300}
        animationOutTiming={300}
        onBackButtonPress={() => setShowModal(false)}
        onBackdropPress={() => setShowModal(false)}
        useNativeDriver
        hideModalContentWhileAnimating
        style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
      >
        <LinearGradient
          colors={["#ffb677", "#ffe0c2"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 250,
            height: 220,
            borderRadius: 30,
            padding: 5,
          }}
          className="h-52 w-72 rounded-[30px] p-[5px]"
        >
          <View className="h-48 w-full rounded-[30px] bg-[#f9f9f9] shadow-lg"></View>
          <Text className="text-sm font-interTight-medium text-center  flex-1 py-3 text-[#b97031]">DESIGN WITH DESIGN STUDIO</Text>
        </LinearGradient>
      </Modal>
    </View>
  );
};

export default ItemCard;
