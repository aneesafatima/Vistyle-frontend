import { Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const StickerItems = ({
  item,
  setSelected,
}: {
  item: number;
  setSelected: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  React.useEffect(() => {
    scale.value = withSpring(isSelected ? 1.15 : 1, { damping: 10 });
  }, [isSelected]);

  return (
    <Animated.View style={[animatedStyle]}>
      <TouchableOpacity
        onPress={() => {
          setIsSelected(!isSelected);
          setSelected(item);
        }}
        activeOpacity={1}
        className="py-4 "
      >
        <Image
          source={item}
          resizeMode="contain"
          className="w-32 h-full mx-3"
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default StickerItems;
