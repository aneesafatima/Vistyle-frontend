import { View, Pressable } from "react-native";
import React from "react";
import Iconify from "react-native-iconify";
import Svg, { Path } from "react-native-svg";

interface FeatureBoxProps {
  color: string;
  icon: string;
  iconColor: string;
  borderColor: string;
}

const FeatureBox = ({ color, icon, iconColor, borderColor }: FeatureBoxProps) => {
  return (
    <View className="flex-grow h-36 bg-white ml-3 rounded-[40px] mt-20 relative border-[2px] overflow-hidden" style={{ borderColor }}>
      {/* Blob background in top-left */}
      <View className="absolute top-0 left-0 w-20 h-20">
        <Svg
          viewBox="0 0 200 200"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
          }}
        >
          <Path
            fill={color}
            d="M58,-32.7C61.2,-27.9,40.2,-8.4,26.5,12.1C12.8,32.7,6.4,54.4,-0.2,54.5C-6.9,54.6,-13.8,33.3,-17.7,18.3C-21.7,3.4,-22.7,-5.1,-19.2,-10C-15.8,-14.8,-7.9,-16,9.8,-21.7C27.4,-27.3,54.8,-37.4,58,-32.7Z"
            transform="translate(30 35) rotate(10) scale(3, 3)"
          />
        </Svg>
      </View>

      {/* Icon in top-left corner over blob */}
      <Pressable className="absolute top-2 left-1 p-2 border rounded-full" style={{ borderColor, backgroundColor: color }}>
        <Iconify
          icon={icon}
          size={27}
          color={iconColor}
        />
      </Pressable>
    </View>
  );
};

export default FeatureBox; 