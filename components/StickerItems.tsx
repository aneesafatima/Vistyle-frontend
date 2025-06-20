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
  item: { url: string; price: number; code: string ; _id: string  };
  setSelected: React.Dispatch<
    React.SetStateAction<{
      url: string;
      price: number;
      code: string;
      _id : string;
    } | null>
  >;
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
          setSelected({
            url: item.url,
            price: item.price,
            code: item.code,
            _id : item._id
          });
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
          <Image source={{uri : item.url}} resizeMode="contain" className="w-32 h-32" />
        </Animated.View>
      </TouchableOpacity>
    </>
  );
};

export default StickerItems;
