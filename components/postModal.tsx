import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Modal from "react-native-modal";
import { Canvas, useImage } from "@shopify/react-native-skia";
import { PostSticker } from ".";
import { router } from "expo-router";

const PostsModal = ({
  stickers,
  onClose,
}: {
  stickers: Sticker[];
  onClose: () => void;
}) => {
  console.log("In post modal");
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const images = stickers.map((sticker) => useImage(sticker.src));
  const imageSize = 130;
  const overlap = 85;
  const canvasWidth =
    imageSize + (stickers.length - 1) * (imageSize - overlap) + 50;
  if (images.every(Boolean) === false) {
    return null;
  }

  return (
    <View className="flex-1">
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        onBackButtonPress={() => setIsVisible(false)}
        backdropColor="black"
        backdropOpacity={0.7}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={700}
        useNativeDriver
        hideModalContentWhileAnimating
        style={{ margin: 0, justifyContent: "flex-end" }}
        onModalWillHide={() => {
          console.log("Modal has been hidden");

          setTimeout(() => {
            onClose();
            if (shouldNavigate) {
              router.push("/(user)/post-upload");
              setShouldNavigate(false);
            }
          }, 400);
        }}
      >
        <View className="bg-white rounded-t-3xl p-4 pb-6 pt-2 w-screen h-[370px] justify-center items-center">
          <Canvas
            style={{
              width: canvasWidth,
              height: 120,
              marginBottom: 3,
              backgroundColor: "#F0F0F0",
            }}
          >
            {images.map((sticker, i) => (
              <PostSticker img={sticker} len={stickers.length} i={i} key={i} />
            ))}
          </Canvas>

          <Text className="text-[#222831] font-georgia text-2xl text-center font-semibold">
            Share this style board with your friends
          </Text>
          <Text className="mt-2 mb-4 px-6 leading-7 text-center text-[#393E46]">
            Styleboards can be viewed by your friends. They will not be able to
            edit.
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            <View style={{ flex: 1, marginRight: 8 }}>
              <Pressable
                className="bg-orange-300 rounded-lg"
                onPress={() => setIsVisible(false)}
              >
                <Text className=" text-white text-center py-3  font-bold">
                  Cancel
                </Text>
              </Pressable>
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Pressable
                className="bg-orange-300 rounded-lg"
                onPress={() => {
                  console.log("Share button pressed");
                  setShouldNavigate(true);
                  setIsVisible(false);
                }}
              >
                <Text className=" text-white text-center py-3  font-bold">
                  Share
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PostsModal;
