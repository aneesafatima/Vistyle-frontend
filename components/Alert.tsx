import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Iconify } from "react-native-iconify";
type AlertProps = {
  text?: string;
  description?: string;
  onAccept?: () => void;
  onCancel?: () => void;
  onAcceptText?: string;
  onCancelText?: string;
};

const Alert = ({
  text,
  description,
  onAccept,
  onCancel,
  onAcceptText,
  onCancelText,
}: AlertProps) => {
  return (
    <View className="absolute inset-0 bg-black/60 z-10 items-center justify-center  ">
      {/* Info Row */}
      <View className="flex-row p-5 bg-white w-80  rounded-[25px] shadow-lg">
       <View>
        <Iconify icon="ic:round-info" size={30} color="#ffb677" />
        </View> 
        <View className="flex flex-col ml-2">
          <Text className="font-bold text-black text-lg uppercase ">
            {text || "Alert"}
          </Text>

          {/* Message */}
          <Text className="text-sm text-gray-700 my-2 pr-10">{description}</Text>

          {/* Buttons */}
          <View className="flex-row justify-end  pt-2 pr-8 my-2">
            <TouchableOpacity onPress={onCancel}>
              <Text className="text-base text-gray-600 mx-4 bg-gray-200 px-4 py-1 rounded-full font-medium">
                {onCancelText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onAccept}>
              <Text className="text-base text-white bg-[#ffb677] px-4 py-1 rounded-full font-medium">
                {onAcceptText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Alert;
