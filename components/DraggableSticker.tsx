import React, { useState } from "react";
import { Image, View, TouchableOpacity, Text } from "react-native";
import { runOnJS } from "react-native-reanimated";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Iconify } from "react-native-iconify";

const DraggableSticker = ({ sticker }: { sticker: Sticker }) => {
  const [stickerData, setStickerData] = useState({
    x: sticker.x,
    y: sticker.y,
    scale: sticker.scale || 1,
    rotation: sticker.rotation || 0,
  });

  const [isLongPressed, setIsLongPressed] = useState(false);

  const x = useSharedValue(stickerData.x);
  const y = useSharedValue(stickerData.y);
  const scale = useSharedValue(stickerData.scale);
  const rotation = useSharedValue(stickerData.rotation);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      x.value = stickerData.x + e.translationX;
      y.value = stickerData.y + e.translationY;
    })
    .onEnd((e) => {
      const newX = stickerData.x + e.translationX;
      const newY = stickerData.y + e.translationY;
      x.value = newX;
      y.value = newY;
      runOnJS(setStickerData)({ ...stickerData, x: newX, y: newY });
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = Math.max(0.5, Math.min(2.0, e.scale * stickerData.scale));
    })
    .onEnd(() => {
      runOnJS(setStickerData)({ ...stickerData, scale: scale.value });
    });

  const rotateGesture = Gesture.Rotation()
    .onUpdate((e) => {
      rotation.value = stickerData.rotation + e.rotation;
    })
    .onEnd(() => {
      runOnJS(setStickerData)({ ...stickerData, rotation: rotation.value });
    });

  const longPressGesture = Gesture.LongPress()
    .minDuration(300) // milliseconds
    .onStart(() => {
      runOnJS(setIsLongPressed)(true);
    });

  const gesture = Gesture.Simultaneous(
    Gesture.Simultaneous(panGesture, pinchGesture, rotateGesture),
    longPressGesture
  );

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: scale.value },
      { rotate: `${rotation.value}rad` },
    ],
    borderWidth: isLongPressed ? 2 : 0,
    borderColor: isLongPressed ? "#38bdf8" : "transparent", // cyan-400
    shadowColor: isLongPressed ? "#000" : "transparent",
    shadowOpacity: isLongPressed ? 0.3 : 0,
    shadowRadius: 6,
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[animatedStyles, { position: "absolute" }]}>
        <Image
          source={sticker.src}
          className="w-40 h-40 bg-slate-600"
          resizeMode="contain"
        />
        {isLongPressed && (
          <View
            className="absolute  left-0 flex-row space-x-2"
            style={{
              transform: [{ translateY: -32 }], // equivalent of translate-y-1/2 if height is ~64
            }}
          >
            <Iconify icon="ic:round-info" size={30} color="#ffb677" />
            <View className="bg-[#ffb677] rounded-full justify-center items-center h-[29px] w-[29px]">
              <Iconify
                icon="gridicons:cross-small"
                size={25}
                color="white"
                className="text-2xl"
              />
            </View>
          </View>
        )}
      </Animated.View>
    </GestureDetector>
  );
};

export default DraggableSticker;
