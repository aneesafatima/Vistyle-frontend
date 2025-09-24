import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Iconify } from "react-native-iconify";

type HelpModalProps = {
  title?: string;
  steps?: string[];
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};

const HelpModal = ({
  title,
  steps,
  showModal,
  setShowModal,
}: HelpModalProps) => {
  return (
    <View className="absolute inset-0 bg-black/60 z-20 items-center justify-center h-full">
      {/* Modal Box */}
      <View className="p-5 bg-white w-80 rounded-[25px] shadow-lg">
        {/* Header Row */}
        <View className="flex-row items-center mb-4">
          <Text className="font-bold text-black text-lg ml-2">
            {title || "How to Use"}
          </Text>
        </View>

        {/* Steps List */}
        <View className="mb-4">
          {steps && steps.length > 0 ? (
            steps.map((step, index) => (
              <View key={index} className="flex-row mb-2">
                <Text className="text-[#ffb677] font-bold mr-2">
                  {index + 1}.
                </Text>
                <Text className="text-gray-700 flex-1">{step}</Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-500 italic">No steps provided yet.</Text>
          )}
        </View>

        {/* Close Button */}
        <View className="flex-row justify-end">
          <TouchableOpacity
            onPress={() => {
              setShowModal(false);
            }}
          >
            <Text className="text-base text-white bg-[#ffb677] px-4 py-1 rounded-full font-medium">
              Got it
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HelpModal;
