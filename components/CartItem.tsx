import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { GlobalContext } from "@/context/GlobalProvider";
import { useDeleteFromCartMutation } from "@/query/features/productApi";
import Iconify from "react-native-iconify";
import { Link } from "expo-router";

//connect item deletion to backend

type CartItemProps = {
  item: {
    title: string;
    price: number;
    size: string;
    url: string;
    code: string;
    img: string;
  };
  i: number;
};

const CartItem = ({ item, i }: CartItemProps) => {
  const [deleteFromCart, { isLoading }] = useDeleteFromCartMutation();
  const { userData, setCart, cart } = useContext(GlobalContext)!;
  const [isDeleting, setIsDeleting] = useState(false);
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  // Animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateX: translateX.value }],
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  useEffect(() => {
    const handleDelete = async () => {
      scale.value = withSequence(
        withTiming(0.95, { duration: 150 }),
        withTiming(0.9, { duration: 100 })
      );
      translateX.value = withTiming(-400, { duration: 300 });
      opacity.value = withTiming(0, { duration: 300 });

      await deleteFromCart({
        email: userData?.email || "",
        code: item.code,
      })
        .unwrap()
        .then(() => {
          setTimeout(() => {
            setIsDeleting(false);
            setCart((prevData) =>
              prevData ? prevData.filter((cartItem) => cartItem == item) : []
            );
          }, 300);
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
          Alert.alert("Error", error.message || "Failed to delete item");
        })
        .finally(() => setIsDeleting(false));
    };
    if (isDeleting) handleDelete();
  }, [isDeleting]);

  return (
    <Animated.View
      style={[animatedStyle]}
      className="flex-row items-center justify-between mb-6 relative overflow-hidden"
      key={i}
    >
      <View className="flex-row items-center justify-between  w-full">
        <Image
          source={{ uri: item.img }}
          className="w-36 h-36 rounded-3xl"
          resizeMode="cover"
          alt={item.title}
        />
        <View className="flex justify-evenly w-36">
          <Text className="text-[#9b9b9b] font-arial-rounded">{`0${
            i + 1
          }`}</Text>
          <Text className="font-semibold font-arial-rounded flex-shrink">
            {item.title.toUpperCase()}
          </Text>
          <View className="flex-row items-center ">
            <Text className="text-sm text-gray-500 mt-1 font-arial-rounded mr-4">
              SIZE: {item.size}
            </Text>
            <Link href={item.url}>
              <Iconify
                icon="mdi:link-variant"
                width={15}
                height={15}
                color="#6b7280"
              />
            </Link>
          </View>
          <Text className="text-base mt-1 font-arial-rounded">
            Rs {item.price}
          </Text>
        </View>
        <TouchableOpacity
          className="items-center w-10"
          onPress={() => setIsDeleting(true)}
          disabled={isDeleting}
        >
          <Iconify icon="mdi:minus" size={25} color="#222831" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default CartItem;
