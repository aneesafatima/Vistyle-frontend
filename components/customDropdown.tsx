import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { GlobalContext } from "@/context/GlobalProvider";
import { set } from "react-hook-form";

const designHouses = [
  { label: "The Minimalist", value: "theminimalist" },
  { label: "The Dreamer", value: "thedreamer" },
  { label: "The Rebel", value: "therebel" },
  { label: "The Iconic", value: "theiconic" },
  { label: "The Trendsetter", value: "thetrendsetter" },
  { label: "The Vintage Soul", value: "thevintagesoul" },
  { label: "The Explorer", value: "theexplorer" },
  { label: "The Romantic", value: "theromantic" },
];
type selectedType = {
  label: string;
  value: string;
};
const CustomDropdown = () => {
  const { userData, updatedUserData, setUpdatedUserData } =
    useContext(GlobalContext)!;
    const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState<selectedType>();
  // const [showOptions, setShowOptions] = useState(false);
  const height = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    height: height.value,
    overflow: "hidden",
  }));
  useEffect(() => {
    setSelected({
      label:
        designHouses.find((item) => item.value === designHouse)?.label ||
        "The Minimalist",
      value: designHouse,
    });
    setUpdatedUserData({
      name: userData?.name || "",
      description: userData?.description || "",
      designHouse: designHouse,
    });
  }, []);
  useEffect(() => {
    console.log("upfatedUserData", updatedUserData);
  }, [updatedUserData]);
  const { designHouse } = userData!;
  const toggleAnimation = () => {
    const newShowOptions = !showOptions;
    setShowOptions(newShowOptions);
    height.value = withTiming(newShowOptions ? 150 : 0, {
      duration: 500,
      easing: Easing.linear,
    });
  };
  const handleSelect = (item: { label: string; value: string }) => {
    setSelected(item);
    setUpdatedUserData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        designHouse: item.value,
      };
    });
  };

  return (
    <View>
      <TouchableOpacity
        className={`flex-row ml-2 justify-between items-center  border-[1px] h-16  ${showOptions ? "border-[#8c9dffc2] " : "border-[#8c9dff69]"}  bg-transparent font-bold  text-[#8c9dffa7]  px-4 py-3 rounded-xl w-full`}
        onPress={() => toggleAnimation()}
      >
        <Text className="text-base text-gray-700">
          {selected ? selected.label : "The Minimalist"}
        </Text>
        <AntDesign name="down" size={16} color="#4B5563" />
      </TouchableOpacity>

      {showOptions && (
        <View className={`rounded-xl border-[1px]   ${showOptions ? "border-[#8c9dffc2] " : "border-[#8c9dff69]"}    ml-2    w-[200px] mt-4`}>
          <Animated.View style={animatedStyles}>
            <View className="">
              <ScrollView>
                {designHouses.map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    className="px-4 py-3 border-b border-gray-200"
                    onPress={() => handleSelect(item)}
                  >
                    <Text className="text-base text-gray-700">
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

export default CustomDropdown;
