import {
  View,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Iconify from "react-native-iconify";
import {
  Alert,
  StickerItems,
  DraggableSticker,
  PostsModal,
} from "@/components";
import { FlatList } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const DesignCanvas = () => {
  const [demoClothes, setDemoClothes] = useState<number[]>([
    require("@/assets/images/top-1.png"),
    require("@/assets/images/top-2.png"),
    require("@/assets/images/top-3.png"),
    require("@/assets/images/bottom-1.png"),
    require("@/assets/images/bottom-2.png"),
    require("@/assets/images/bottom-3.png"),
    require("@/assets/images/shoes-1.png"),
    require("@/assets/images/shoes-2.png"),
    require("@/assets/images/shoes-3.png"),
  ]);

  const [selected, setSelected] = useState<number | null>(null);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [showPostsModal, setShowPostsModal] = useState(false);

  const handleItemInsertion = (event: any) => {
    if (selected == null) return; // No item selected
    setDemoClothes((prev) => prev.filter((item) => item !== selected)); // Remove the selected item from the list
    setStickers([
      ...stickers,
      {
        x: event.nativeEvent.locationX, // Center the item
        y: event.nativeEvent.locationY, // Center the item
        src: selected!,
        id: Date.now() + Math.random(), // unique id
      },
    ]);
    setSelected(null); // Optionally deselect after placing
  };

  return (
    <>
      <SafeAreaView className="flex-1  relative">
        <StatusBar backgroundColor={"#222831"} barStyle="light-content" />
        <PostsModal
          stickers={stickers}
          showPostsModal={showPostsModal}
          setShowPostsModal={setShowPostsModal}
        />
        
        <Alert
          description="All your design work will be lost if not saved to drafts before exiting."
          onAccept={() => {
            router.push("/(user)/design-studio");
          }}
          onAcceptText="Dismiss"
          onCancelText="Cancel"
        />
        <TouchableWithoutFeedback onPress={handleItemInsertion}>
          <View className="h-full bg-[#222831] relative">
            {/* Canvas Container */}

            <View
              className="bg-[#F9F9FB] flex-grow mb-2 m-3 rounded-[24px] relative z-10"
              onTouchStart={handleItemInsertion}
            >
              {/* 🟦 Draggable Animated Circle */}

              {stickers?.map((sticker) => (
                <DraggableSticker key={sticker.id} sticker={sticker} />
              ))}

              {/* UI Controls */}
              <View className="flex flex-row justify-between items-center p-4 absolute top-0 left-0 right-0">
                <TouchableOpacity
                  className="bg-[#9eadffd9] p-[10px] rounded-full"
                >
                  <Iconify
                    icon="gridicons:cross-small"
                    size={30}
                    color="#222831"
                    className="text-2xl"
                  />
                </TouchableOpacity>
              </View>

              {/* Bottom Floating Button */}
              <TouchableOpacity
                className="bg-[#9eadffd9] p-4 rounded-full absolute bottom-0 right-0 m-4"
                onPress={() => {
                  setShowPostsModal(true);
                }}
              >
                <Iconify
                  icon="lets-icons:done-round-fill"
                  size={27}
                  color="#222831"
                  className="text-2xl"
                />
              </TouchableOpacity>
            </View>

            {/* Bottom Panel */}
            <View className="bg-[#F9F9FB] h-44 m-[6px] rounded-[24px]  overflow-hidden">
              <FlatList
                horizontal
                className="flex-row "
                data={demoClothes}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <StickerItems item={item} setSelected={setSelected} />
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  );
};

export default DesignCanvas;
