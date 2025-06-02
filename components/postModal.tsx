import { View, Text, Image } from "react-native";
import React, { useContext } from "react";
import Modal from "react-native-modal";
import { GlobalContext } from "@/context/GlobalProvider";

const PostsModal = ({
  stickers,
  showPostsModal,
  setShowPostsModal,
}: {
  stickers: Sticker[];
  showPostsModal: boolean;
  setShowPostsModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // UPDATE THE TAGS IN BACKEND AND UI
  const { userData, setUserData } = useContext(GlobalContext)!;
  console.log("Stickers PostsModal:", stickers);

  return (
    <Modal
      isVisible={true} // ✅ Use the prop instead of hardcoded true
      onBackdropPress={() => setShowPostsModal(false)}
      onBackButtonPress={() => setShowPostsModal(false)} // ✅ Handle Android back button
      coverScreen
      hasBackdrop={true}
      backdropColor="black"
      backdropOpacity={0.7}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300} // ✅ Add timing for smoother animation
      animationOutTiming={300}
      useNativeDriver={true} // ✅ Better performance
      hideModalContentWhileAnimating={true} // ✅ Prevents flicker
      style={{
        margin: 0,
        justifyContent: "flex-end", // Aligns the modal to the bottom
      }}
    >
      <View className="bg-white rounded-lg p-4 pb-6 w-full h-96 rounded-t-3xl justify-center items-center">
        <Image
          source={require("../assets/images/top-1.png")}
          className="w-32 h-32"
        />
        <Text className="text-[#222831] font-georgia text-2xl text-center font-semibold">Share this style board with your friends</Text>
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
                // Add your share logic here
              }}
            >
              Share
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PostsModal;
