import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { houses, houseEmojis } from "@/assets/ui-data/data";

const HouseSelector = () => {
  const [selectedHouse, setSelectedHouse] = useState("");
  const { width: screenWidth } = Dimensions.get("window");
  const boxWidth = (screenWidth - 48) / 2; // 2 boxes per row with padding
  return (
    <View className="p-4">
      <Text className="text-sm font-semibold text-[#737373] mb-5 mt-4 text-center font-arial-rounded">
        Choose a design house that reflects your style — it represents you and
        sets your default profile picture.
      </Text>

      <View className="flex-row flex-wrap justify-between">
        {houses.map((house, index) => {
          const isSelected = selectedHouse === house;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedHouse(house)}
              style={{
                width: boxWidth,
                backgroundColor: "transparent",
                borderColor: isSelected ? "#9eadffd9" : "#E5E5E5",
                borderWidth: 1,
              }}
              className="mb-3 p-4 rounded-xl min-h-[80px] justify-center items-center"
            >
              <Text
                style={{
                  color: isSelected ? "#222831" : "#737373",
                }}
                className="font-medium text-center text-sm leading-5"
              >
                {houseEmojis[house]} {house}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default HouseSelector;
