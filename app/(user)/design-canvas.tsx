import { View, TouchableOpacity, Dimensions, Image } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Iconify from "react-native-iconify";
import { Alert, StickerItems } from "@/components";
import {
  GestureDetector,
  Gesture,
  FlatList,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  SharedValue,
} from "react-native-reanimated";
import { demoClothes } from "@/assets/ui-data/data";
const { width, height } = Dimensions.get("window");

const DesignCanvas = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [stickers, setStickers] = useState<
    {
      x: SharedValue<number>;
      y: SharedValue<number>;
      src: number;
      id: number;
    }[]
  >([]);

  // const animatedStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       { translateX: withSpring(x.value) },
  //       { translateY: withSpring(y.value) },
  //     ],
  //   };
  // });

  const handleItemInsertion = (event: any) => {
    if (!selected) return; // No item selected
    setStickers([
      ...stickers,
      {
        x: useSharedValue(event.nativeEvent.locationX - 50), // Center the item
        y: useSharedValue(event.nativeEvent.locationY - 50), // Center the item
        src: selected!,
        id: Date.now() + Math.random(), // unique id
      },
    ]);
    setSelected(null); // Optionally deselect after placing
  };

  return (
    <SafeAreaView className="flex-1 flex-col relative">
      {showAlert && (
        <Alert
          description="All your design work will be lost if not saved to drafts before exiting."
          onAccept={() => {
            setShowAlert(false);
            router.push("/(user)/design-studio");
          }}
          onCancel={() => setShowAlert(false)}
          onAcceptText="Dismiss"
          onCancelText="Cancel"
        />
      )}

      <View className="h-full bg-[#9eadffd9] relative">
        {/* Canvas Container */}
        <View
          className="bg-[#F9F9FB] flex-grow mb-2 m-3 rounded-[24px] relative"
          onTouchStart={handleItemInsertion}
        >
          {/* 🟦 Draggable Animated Circle */}

          {stickers.map((sticker) => {
            const panGesture = Gesture.Pan().onUpdate((e) => {
              sticker.x.value += e.translationX;
              sticker.y.value += e.translationY;
            });
            const animatedStyles = useAnimatedStyle(() => {
              return {
                transform: [
                  { translateX: withSpring(sticker.x.value) },
                  { translateY: withSpring(sticker.y.value) },
                ],
              };
            });

            return (
              <GestureDetector gesture={panGesture}>
                <Animated.View
                  key={sticker.id}
                  style={[
                    {
                      position: "absolute",
                      left: sticker.x,
                      top: sticker.y,
                    },
                    animatedStyles,
                  ]}
                >
                  <Image
                    key={sticker.id}
                    source={sticker.src}
                    className="w-32 h-32"
                    resizeMode="contain"
                  />
                </Animated.View>
              </GestureDetector>
            );
          })}

          {/* UI Controls */}
          <View className="flex flex-row justify-between items-center p-4 absolute top-0 left-0 right-0">
            <TouchableOpacity
              className="bg-[#fde0ca] p-[10px] rounded-full"
              onPress={() => setShowAlert(true)}
            >
              <Iconify
                icon="gridicons:cross-small"
                size={30}
                color="#F06038"
                className="text-2xl"
              />
            </TouchableOpacity>

            <TouchableOpacity className="bg-[#fde0ca] p-3 rounded-full">
              <Iconify
                icon="lets-icons:done-round-fill"
                size={27}
                color="#F06038"
                className="text-2xl"
              />
            </TouchableOpacity>
          </View>

          {/* Bottom Floating Button */}
          <TouchableOpacity className="bg-[#fde0ca] p-4 rounded-full absolute bottom-0 right-0 m-4">
            <Iconify
              icon="icomoon-free:enlarge2"
              size={20}
              color="#F06038"
              className="text-2xl"
            />
          </TouchableOpacity>
        </View>

        {/* Bottom Panel */}
        <View className="bg-[#F9F9FB] h-44 m-[6px] rounded-[24px]">
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
    </SafeAreaView>
  );
};

export default DesignCanvas;
