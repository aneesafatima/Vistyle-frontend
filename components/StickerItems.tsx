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
    scale.value = withSpring(isSelected ? 1.12 : 1, { damping: 10 });
  }, [isSelected]);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsSelected(!isSelected);
          setSelected(item);
        }}
        activeOpacity={1}
        className={`w-40 border-[#222831] border-r-2  ${
          isSelected && "bg-[#e3e2e2] relative"
        }`}
      >
        <Animated.View
          style={[
            animatedStyle,
            {
              display: "flex",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Image
            source={item}
            resizeMode="contain"
            className="w-32 h-32"
          />
        </Animated.View>
      </TouchableOpacity>
    </>
  );
};

export default StickerItems;
