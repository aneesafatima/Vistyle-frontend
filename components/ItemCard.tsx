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
import Modal from "react-native-modal";
import { LinearGradient } from "react-native-linear-gradient";
import { TextInput } from "react-native-gesture-handler";
import { set } from "react-hook-form";
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
  const [category, setCategory] = useState("");
  const [position, setPosition] = useState<
    "top" | "middle" | "bottom" | null
  >();

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
        // animationOutTiming={300}
        onBackButtonPress={() => setShowModal(false)}
        onBackdropPress={() => setShowModal(false)}
        useNativeDriver
        hideModalContentWhileAnimating={true}
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
          <View className="h-48 w-full rounded-[30px] bg-[#f9f9f9] shadow-lg justify-center items-center px-4">
            <View className="w-full font-interTight-medium">
              <View>
                <Text className="text-sm font-medium text-[#c1c1c1] mb-3">
                  {" "}
                  Enter Category
                </Text>
                <Iconify
                  icon="material-symbols-light:done"
                  size={24}
                  color="#b97031"
                />
              </View>
              <View className="w-full h-10 relative mb-2">
                <TextInput
                  className="w-full h-10 text-sm border-[1px] border-[#e3e3e3] rounded-2xl pl-5 font-interTight-regular"
                  placeholder="e.g. Sneakers, tops, etc."
                  placeholderTextColor={"#e3e3e3"}
                  value={category.toLowerCase()}
                  onChangeText={(text) => setCategory(text.toLowerCase())}
                  maxLength={10}
                />
                <Text className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#c1c1c1]">
                  {category.length}/10
                </Text>
              </View>
              <View>
                <Text className="text-sm font-medium text-[#c1c1c1] mt-3">
                  {" "}
                  Select Position
                </Text>
                <View className="flex flex-row pl-3 mt-4">
                  {["top", "middle", "bottom"].map((pos) => (
                    <Pressable
                      onPress={() =>
                        setPosition(pos as "top" | "middle" | "bottom")
                      }
                      key={pos}
                      style={{
                        backgroundColor:
                          position === pos ? "#ffb77783" : "#ffb7774d",
                        borderColor:
                          position === pos ? "#b97031" : "transparent",
                        borderWidth: position === pos ? 1 : 0,
                      }}
                      className="rounded-full px-3 py-1 mr-2  -m-1"
                    >
                      <Text className="text-[#b97031] text-sm">{pos}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
          </View>
          <Text className="text-sm font-interTight-medium text-center  flex-1 py-3 text-[#b97031]">
            design with the design studio
          </Text>
        </LinearGradient>
      </Modal>
    </View>
  );
};

export default ItemCard;
