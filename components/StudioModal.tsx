import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { LinearGradient } from "react-native-linear-gradient";
import { TextInput } from "react-native-gesture-handler";
import Iconify from "react-native-iconify";
import { useCreateStickerMutation } from "../query/features/designStdApi";
import { GlobalContext } from "@/context/GlobalProvider";
type StudioModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setPosition: React.Dispatch<
    React.SetStateAction<"top" | "middle" | "bottom" | undefined>
  >;
  position: "top" | "middle" | "bottom" | undefined;
  selectedProduct: {
    pirce: number;
    code: string;
    url: string;
  };
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<{
      price: number;
      code: string;
      url: string;
    }>
  >;
};

const StudioModal = ({
  showModal,
  setShowModal,
  setCategory,
  category,
  setPosition,
  position,
  selectedProduct,
  setSelectedProduct,
}: StudioModalProps) => {
  const [createDesign, { isLoading }] = useCreateStickerMutation();
  const { userData, setUserData } = React.useContext(GlobalContext)!;
  const handleStickerCreation = async () => {
    if (!category || !position) {
      return;
    }
    try {
      const response = await createDesign({
        category,
        position,
        code: selectedProduct.code,
        price: selectedProduct.price,
        url: selectedProduct.url,
        email: userData?.email || "",
      }).unwrap();
      console.log("Sticker created successfully:", response);
      setUserData((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          stickers: response.stickers,
        };
      });
      setSelectedProduct({
        price: 0,
        code: "",
        url: "",
      });

      setShowModal(false);
    } catch (error) {
      console.error("Error creating sticker:", error);
    }
  };
  return (
    <Modal
      isVisible={showModal}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropColor="black"
      backdropOpacity={0.2}
      coverScreen={true}
      animationInTiming={300}
      onBackButtonPress={() => {
        if (!isLoading) setShowModal(false);
      }}
      onBackdropPress={() => {
        if (!isLoading) setShowModal(false);
      }}
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
            <View className="flex flex-row items-center justify-between  mb-[6px]  2xl">
              <Text className="text-sm font-medium text-[#c1c1c1] ">
                {" "}
                Enter Category
              </Text>
              {isLoading ? (
                <ActivityIndicator size="small" color="#c1c1c1" />
              ) : (
                <Pressable className="-mt-8" onPress={handleStickerCreation}>
                  <Iconify
                    icon="hugeicons:plus-sign"
                    size={20}
                    color="#c1c1c1"
                  />
                </Pressable>
              )}
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
              <Text className="text-sm font-medium text-[#c1c1c1] ">
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
                      borderColor: position === pos ? "#b97031" : "transparent",
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
  );
};

export default StudioModal;
