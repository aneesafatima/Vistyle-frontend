import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import {
  Canvas,
} from "@shopify/react-native-skia";
import { PostSticker, Alert } from ".";

const PostsModal = ({
  stickers,
  showPostsModal,
  setShowPostsModal,
}: {
  stickers: Sticker[];
  showPostsModal: boolean;
  setShowPostsModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [alertDetails, setAlertDetails] = useState<{
    text: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    if (showPostsModal) {
      if (stickers.length === 0) {
        setAlertDetails({
          text: "No Stickers",
          description: "Please add some stickers to share your style board.",
        });
        setShowPostsModal(false);
      } else if (stickers.length < 3) {
        setAlertDetails({
          text: "Not Enough Stickers",
          description: "Please add at least 3 stickers to share your style board.",
        });
        setShowPostsModal(false);
      } else if (stickers.length > 5) {
        setAlertDetails({
          text: "Too Many Stickers",
          description: "There can be a maximum of 5 stickers on a style board.",
        });
        setShowPostsModal(false);
      }
    }
  }, [showPostsModal]);

  const imageSize = 130;
  const overlap = 85;
  const canvasWidth = imageSize + (stickers.length - 1) * (imageSize - overlap) + 50;
  const canvasHeight = 170;

  // If an alert should be shown, render the alert
  if (alertDetails) {
    return (
      <Alert
        text={alertDetails.text}
        description={alertDetails.description}
        onAcceptText="Dismiss"
        onAccept={() => setAlertDetails(null)} // Clear alert on dismiss
      />
    );
  }

  return (
    <View className="flex-1">
      <Modal
        isVisible={showPostsModal}
        onBackdropPress={() => setShowPostsModal(false)}
        onBackButtonPress={() => setShowPostsModal(false)}
        backdropColor="black"
        backdropOpacity={0.7}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        useNativeDriver
        hideModalContentWhileAnimating
        style={{ margin: 0, justifyContent: "flex-end" }}
      >
        <View className="bg-white rounded-t-3xl p-4 pb-6 w-screen h-[400px] justify-center items-center">
          <Canvas
            style={{
              width: canvasWidth,
              height: canvasHeight,
              marginBottom: 5,
            }}
          >
            {stickers.map((sticker, i) => (
              <PostSticker img={sticker.src} len={stickers.length} i={i} key={i} />
            ))}
          </Canvas>

          <Text className="text-[#222831] font-georgia text-2xl text-center font-semibold">
            Share this style board with your friends
          </Text>
          <Text className="mt-2 mb-4 px-6 leading-7 text-center text-[#393E46]">
            Styleboards can be viewed by your friends. They will not be able to edit.
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text
                className="bg-orange-300 text-white text-center py-3 rounded-lg font-bold"
                onPress={() => setShowPostsModal(false)}
              >
                Cancel
              </Text>
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text
                className="bg-orange-300 text-white text-center py-3 rounded-lg font-bold"
                onPress={() => {
                  // Add share logic here
                }}
              >
                Share
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PostsModal;
