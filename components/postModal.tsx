import { View, Text, Pressable } from "react-native";
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
      isVisible={showPostsModal} // ✅ Use the prop instead of hardcoded true
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
      <View className="bg-white rounded-lg p-4 pb-6 w-full h-80  ">
        {/* Your modal content here */}
      </View>
    </Modal>
  );
};

export default PostsModal;