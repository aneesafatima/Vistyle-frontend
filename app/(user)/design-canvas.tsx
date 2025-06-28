import {
  View,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { router, useFocusEffect } from "expo-router";
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
  const { userData } = useContext(GlobalContext)!;
  const [selected, setSelected] = useState<Sticker | null>(null);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [showPostsModal, setShowPostsModal] = useState(false);
  const [alertDetails, setAlertDetails] = useState<{
    text: string;
    description: string;
  } | null>(null);
  const postStickers = useRef<Sticker[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      setSelected(null);
      setStickers([]);
      setShowPostsModal(false);
      postStickers.current = [];
    }, [])
  );
  const handlePostValidation = () => {
    let alert: { text: string; description: string } | null = null;

    if (stickers.length === 0) {
      alert = {
        text: "No Stickers",
        description: "Please add some stickers to your style board.",
      };
    } else if (stickers.length < 3) {
      alert = {
        text: "Not Enough Stickers",
        description: "Please add at least 3 stickers to your style board.",
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
      setIsLoading(true);
    }
  };
  const handleStickerRemove = (id: string) => {
    setStickers((prevStickers) =>
      prevStickers.filter((sticker) => sticker.id !== id)
    );
  };
  const handleItemInsertion = (event: any) => {
    if (selected == null) return; // No item selected
    setStickers([
      ...stickers,
      {
        x: event.nativeEvent.locationX - 160 / 2, // Center the item
        y: event.nativeEvent.locationY - 160 / 2, // Center the item
        src: selected.src,
        id: selected.id,
        price: selected.price,
        code: selected.code,
        scale: 1, // Default scale
        rotation: 0, // Default rotation
      },
    ]);
    setSelected(null);
  };
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
            onCloseStart={() => setIsLoading(false)}
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
        {showAlert && (
          <Alert
            description="All your design work will be lost if not saved to drafts before exiting."
            onAccept={() => {
              setStickers([]);
              router.push("/(user)/design-studio");
              setShowAlert(false);
            }}
            onAcceptText="Dismiss"
            onCancel={() => setShowAlert(false)}
            onCancelText="Cancel"
          />
        )}
        <View className="h-full bg-[#222831] relative">
          {/* Canvas Container */}
          <View
            className="bg-[#F9F9FB] flex-grow  m-3 rounded-[24px] relative overflow-hidden"
            onTouchStart={handleItemInsertion}
          >
            {/* 🟦 Draggable Animated Circle */}

            {stickers?.map((sticker, i) => (
              <DraggableSticker
                key={`${sticker.id}-${i}`}
                sticker={sticker}
                handleStickerRemove={handleStickerRemove}
              />
            ))}

            {/* UI Controls */}
            <View className="flex flex-row justify-between items-center p-4 absolute top-0 left-0 right-0">
              <TouchableOpacity
                className="bg-[#9eadffd9] p-[10px] rounded-full"
                onPress={() => {
                  setShowAlert(true);
                }}
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
                postStickers.current = stickers;
                handlePostValidation();
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#222831" />
              ) : (
                <Iconify
                  icon="lets-icons:done-round-fill"
                  size={27}
                  color="#222831"
                  className="text-2xl"
                />
              )}
            </TouchableOpacity>
          </View>

          {/* Bottom Panel */}
          <View className="bg-[#F9F9FB] h-44 m-[6px] mt-[8px] rounded-[24px]  overflow-hidden">
            <FlatList
              horizontal
              className="flex-row "
              data={userData?.stickers.filter(
                (item) => !stickers?.some((sticker) => item._id === sticker.id) // Filter out already placed stickers
              )}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <StickerItems
                  item={{
                    x: 0,
                    y: 0,
                    src: item.url,
                    price: item.price,
                    code: item.code,
                    id: item._id,
                    scale: 1,
                    rotation: 0,
                  }}
                  setSelected={setSelected}
                  selected={selected}
                />
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default DesignCanvas;
