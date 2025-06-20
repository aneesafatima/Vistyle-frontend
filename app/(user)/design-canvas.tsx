import { View, TouchableOpacity, StatusBar } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
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
import { GlobalContext } from "@/context/GlobalProvider";

const DesignCanvas = () => {
  console.log("In design canvas");
  const { userData } = useContext(GlobalContext)!;
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

  const [selected, setSelected] = useState<{
    url: string;
    price: number;
    code: string;
    _id: string;
  } | null>(null);
  const [stickers, setStickers] = useState<Sticker[]>(userData?.stickers.map((s, index) => ({
      x: 0,
      y: 0,
      src: s.url,
      id: s._id,
      price: s.price,
      code: s.code,
      scale: 1,
      rotation: 0,
    })) || []);
  const [showPostsModal, setShowPostsModal] = useState(false);
  const [alertDetails, setAlertDetails] = useState<{
    text: string;
    description: string;
  } | null>(null);
  const postStickers = useRef<Sticker[]>([]);
  console.log("User Data in Design Studio:", userData?.stickers);

  const handlePostValidation = () => {
    let alert: { text: string; description: string } | null = null;

    if (stickers.length === 0) {
      alert = {
        text: "No Stickers",
        description: "Please add some stickers to share your style board.",
      };
    } else if (stickers.length < 3) {
      alert = {
        text: "Not Enough Stickers",
        description:
          "Please add at least 3 stickers to share your style board.",
      };
    } else if (stickers.length > 5) {
      alert = {
        text: "Too Many Stickers",
        description: "There can be a maximum of 5 stickers on a style board.",
      };
    }

    if (alert) {
      setAlertDetails(alert);
    } else {
      setShowPostsModal(true);
    }
  };

  const handleItemInsertion = (event: any) => {
    if (selected == null) return; // No item selected

    setStickers([
      ...stickers,
      {
        x: event.nativeEvent.locationX, // Center the item
        y: event.nativeEvent.locationY, // Center the item
        src: selected.url,
        id: selected._id,
        price: selected.price,
        code: selected.code,
      },
    ]);
    setSelected(null); // Optionally deselect after placing
  };
  console.log("In design canvas ");

  return (
    <>
      <SafeAreaView className="flex-1  relative">
        <StatusBar backgroundColor={"#222831"} barStyle="light-content" />

        {showPostsModal && (
          <PostsModal
            stickers={postStickers.current}
            onClose={() => {
              setShowPostsModal(false);
            }}
          />
        )}

        {alertDetails && (
          <Alert
            text={alertDetails.text}
            description={alertDetails.description}
            onAcceptText="Dismiss"
            onAccept={() => setAlertDetails(null)}
          />
        )}

        <Alert
          description="All your design work will be lost if not saved to drafts before exiting."
          onAccept={() => {
            setStickers([]);
            router.push("/(user)/design-studio");
          }}
          onAcceptText="Dismiss"
          onCancelText="Cancel"
        />

        <View className="h-full bg-[#222831] relative">
          {/* Canvas Container */}

          <View
            className="bg-[#F9F9FB] flex-grow mb-2 m-3 rounded-[24px] relative overflow-hidden"
            onTouchStart={handleItemInsertion}
          >
            {/* 🟦 Draggable Animated Circle */}

            {stickers?.map((sticker) => (
              <DraggableSticker key={sticker.id} sticker={sticker} />
            ))}

            {/* UI Controls */}
            <View className="flex flex-row justify-between items-center p-4 absolute top-0 left-0 right-0">
              <TouchableOpacity className="bg-[#9eadffd9] p-[10px] rounded-full">
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
                postStickers.current = stickers;
                console.log("In on press");
                handlePostValidation();
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
              data={userData?.stickers}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <StickerItems item={{
                  url: item.url,
                  price: item.price,
                  code: item.code,
                  _id: item._id,
                }} setSelected={setSelected} />
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default DesignCanvas;
