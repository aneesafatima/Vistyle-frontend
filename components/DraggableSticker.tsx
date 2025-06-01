import React, { useState } from "react";
import { Image } from "react-native";
import { runOnJS } from "react-native-reanimated";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const DraggableSticker = ({ sticker }: { sticker: Sticker }) => {
  const [stickerData, setStickerData] = useState({
    x: sticker.x,
    y: sticker.y,
    scale: sticker.scale || 1,
    rotation: sticker.rotation || 0, // Add initial rotation data
  });

  const x = useSharedValue(stickerData.x);
  const y = useSharedValue(stickerData.y);
  const scale = useSharedValue(stickerData.scale);
  const rotation = useSharedValue(stickerData.rotation); // Add shared value for rotation

  // Pan Gesture for dragging
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
      runOnJS(setStickerData)({
        ...stickerData,
        x: newX,
        y: newY,
      });
    });

  // Pinch Gesture for scaling
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = Math.max(0.5, Math.min(2.0, e.scale * stickerData.scale));
    })
    .onEnd(() => {
      runOnJS(setStickerData)({
        ...stickerData,
        scale: scale.value,
      });
    });

  // Rotation Gesture
  const rotateGesture = Gesture.Rotation()
    .onUpdate((e) => {
      rotation.value = stickerData.rotation + e.rotation; // Update the rotation
    })
    .onEnd(() => {
      runOnJS(setStickerData)({
        ...stickerData,
        rotation: rotation.value, // Save the new rotation value
      });
    });

  // Combine all gestures
  const gesture = Gesture.Simultaneous(panGesture, pinchGesture, rotateGesture);

  // Animated style for transformations
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: scale.value },
      { rotate: `${rotation.value}rad` }, // Apply rotation in radians
    ],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[animatedStyles, { position: "absolute" }]}>
        <Image
          source={sticker.src}
          className="w-56 h-56"
          resizeMode="contain"
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default DraggableSticker;
