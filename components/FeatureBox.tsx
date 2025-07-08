import { View, Pressable, Text } from "react-native";
import React from "react";
import Iconify from "react-native-iconify";
import Svg, { Path } from "react-native-svg";

interface FeatureBoxProps {
  color: string;
  icon: string;
  iconColor: string;
  borderColor: string;
  text:string
  bgColor: string; // Optional background color
}

const FeatureBox = ({
  color,
  icon,
  iconColor,
  borderColor,
  text,
  bgColor
}: FeatureBoxProps) => {
  return (
    <View
      className="flex-grow h-36 ml-3 rounded-[40px] mt-10 relative border-[2px] overflow-hidden"
      style={{ borderColor, backgroundColor: bgColor}}
    >

      <Pressable
        className="absolute top-3 left-2 p-2 border rounded-full bg-yellow-200"
        style={{ borderColor, backgroundColor: color }}
      >
        <Iconify icon={icon} size={27} color={iconColor} />
      </Pressable>
      <View className="h-full justify-center items-end flex pr-8">
        <Text className="font-arial-rounded text-xl text-[#222831] font-bold" style={{color:iconColor}}>{text}</Text>
      </View>
    </View>
  );
};

export default FeatureBox;
