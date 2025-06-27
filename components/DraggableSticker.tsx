import React, { useState } from "react";
import { Image, View, TouchableOpacity, Text } from "react-native";
import { runOnJS } from "react-native-reanimated";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import Iconify from "react-native-iconify";

const DraggableSticker = ({
  sticker,
  handleStickerRemove,
}: {
  sticker: Sticker;
  handleStickerRemove: (id: string) => void;
}) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
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

  let otherUIHeight = 202;
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      const newX = stickerData.x + e.translationX;
      const newY = stickerData.y + e.translationY;

      const baseStickerSize = 5;
      const actualStickerWidth = baseStickerSize * stickerData.scale;
      const actualStickerHeight = baseStickerSize * stickerData.scale;

      const canvasWidth = screenWidth - 24;
      const canvasHeight = screenHeight - 202;

      // Boundaries for top-left corner positioning
      const minX = 15; // Left edge of canvas
      const maxX = canvasWidth - actualStickerWidth; // Right edge minus sticker width
      const minY = 15; // Top edge of canvas
      const maxY = canvasHeight - actualStickerHeight; // Bottom edge minus sticker height

      x.value = Math.max(minX, Math.min(maxX, newX));
      y.value = Math.max(minY, Math.min(maxY, newY));
    })
    .onEnd((e) => {
      const newX = stickerData.x + e.translationX;
      const newY = stickerData.y + e.translationY;
      const baseStickerSize = 5;
      const actualStickerWidth = baseStickerSize * stickerData.scale;
      const actualStickerHeight = baseStickerSize * stickerData.scale;
      const canvasWidth = screenWidth - 24;
      const canvasHeight = screenHeight - 202;
      const minX = 15;
      const maxX = canvasWidth - actualStickerWidth;
      const minY = 15;
      const maxY = canvasHeight - actualStickerHeight;
      const clampedX = Math.max(minX, Math.min(maxX, newX));
      const clampedY = Math.max(minY, Math.min(maxY, newY));
      x.value = clampedX;
      y.value = clampedY;
      runOnJS(setStickerData)({ ...stickerData, x: clampedX, y: clampedY });
    });
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = Math.max(0.5, Math.min(3.0, e.scale * stickerData.scale));
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
      runOnJS(setIsLongPressed)(!isLongPressed);
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
    borderColor: isLongPressed ? "#eeeeee" : "transparent",
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          animatedStyles,
          {
            position: "absolute",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Image
          source={{ uri: sticker.src }}
          className="w-40 h-40"
          resizeMode="contain"
        />
        {isLongPressed && (
          <View
            className="absolute  left-1 flex-row items-center top-3"
            style={{
              transform: [{ translateX: -50 }],
            }}
          >
            <TouchableOpacity>
              <Iconify icon="ic:round-info" size={22} color="#e2e2e2" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleStickerRemove(sticker.id)}>
              <View className="bg-[#e2e2e2] rounded-full justify-center items-center w-5 h-5">
                <Iconify
                  icon="gridicons:cross-small"
                  size={17}
                  color="white"
                  className="text-2xl"
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </GestureDetector>
  );
};

export default DraggableSticker;
