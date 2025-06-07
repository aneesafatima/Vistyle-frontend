import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Image, Group, useImage } from "@shopify/react-native-skia";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const PostSticker = ({
  img,
  len,
  i,
}: {
  img: number;
  len: number;
  i: number;
}) => {
  const animatedScale = useSharedValue(0);

  useEffect(() => {
    animatedScale.value = withTiming(1, { duration: 500 });
  }, []);

  // Calculate position values first
  const imageSize = 130;
  const overlap = 85;
  const canvasWidth = imageSize + (len - 1) * (imageSize - overlap) + 50;

  const centerIndex = Math.floor(len / 2);
  const offset = i - centerIndex;
  const rotation = offset * 12;
  const x = canvasWidth / 2 - imageSize / 2 + offset * (imageSize - overlap);
  const y = 10;

  const transform = useDerivedValue(() => {
    return [
      { translateX: x + imageSize / 2 },
      { translateY: y + imageSize / 2 },
      { rotate: (rotation * Math.PI) / 180 },
      { scale: animatedScale.value },
      { translateX: -imageSize / 2 },
      { translateY: -imageSize / 2 },
    ];
  }, [animatedScale.value]); // Add dependency
  const skImage = useImage(img);
  if (!skImage) return null; // Ensure image is loaded before rendering

  return (
    <Group transform={transform}>
      <Image image={skImage} width={imageSize} height={imageSize} />
    </Group>
  );
};

export default PostSticker;
