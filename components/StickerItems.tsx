import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Iconify from "react-native-iconify";
import { GlobalContext } from "@/context/GlobalProvider";
import { useDeleteStickerMutation } from "@/query/features/designStdApi";

const StickerItems = ({
  item,
  setSelected,
  selected,
}: {
  item: {
    x: number;
    y: number;
    src: string;
    price: number;
    code: string;
    id: string;
    scale: number;
    rotation: number;
  };
  setSelected: React.Dispatch<React.SetStateAction<Sticker | null>>;
  selected: Sticker | null;
}) => {
  const { userData, setUserData } = React.useContext(GlobalContext)!;
  const [deleteSticker] = useDeleteStickerMutation();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  React.useEffect(() => {
    scale.value = withSpring(selected?.id == item.id ? 1.12 : 1, {
      damping: 10,
    });
  }, [selected]);

  const onDelete = (id: string) => {
    setUserData((prev) => ({
      ...prev!,
      stickers: prev?.stickers.filter((sticker) => sticker._id !== id) || [],
    }));
    setSelected(null);
    setTimeout(async () => {
      await deleteSticker({ id, email: userData?.email || "" });
    }, 2000);
  };
  
  return (
    <TouchableOpacity
      onPress={() => {
        selected?.id === item.id
          ? setSelected(null)
          : setSelected({
              x: item.x,
              y: item.y,
              src: item.src,
              price: item.price,
              code: item.code,
              id: item.id,
            });
      }}
      key={item.id}
      activeOpacity={1}
      className={`w-40 border-[#222831] border-r-2  ${
        selected?.id == item.id && "bg-[#e3e2e2] relative"
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
        {selected?.id === item.id && (
          <TouchableOpacity
            onPress={() => onDelete(item.id)}
            style={{
              position: "absolute",
              top: 20,
              left: 15,
              zIndex: 10,
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 2,
              opacity: 0.85,
            }}
            hitSlop={10}
          >
            <Iconify icon="mdi:minus" color="#222831" width={16} height={16} />
          </TouchableOpacity>
        )}
        <Image
          source={{ uri: item.src }}
          resizeMode="contain"
          className="w-32 h-32"
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default StickerItems;
