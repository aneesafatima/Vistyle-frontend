import React, { useState } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { FashionInterest } from "@/assets/ui-data/data";

const InterestsSelector = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  return (
    <View className="p-4">
      <Text className="text-sm font-semibold text-[#737373] mb-8 mt-4 px-8 text-center font-arial-rounded">
        Select at least 3 interests to proceed. These interests will be used to filter posts once the community is live.
      </Text>

      <View className="flex-row flex-wrap justify-center px-2">
        {FashionInterest.map((interest) => {
          const isSelected = selectedInterests.includes(interest);
          return (
            <Pressable
              key={interest}
              onPress={() => toggleInterest(interest)}
              className="px-4 py-2 rounded-full mr-2 mb-2"
              style={{
                borderWidth: 1,
                borderColor: isSelected ? "#9eadffd9" : "#E5E5E5",
              }}
            >
              <Text
                style={{
                  color: isSelected ? "#222831" : "#737373",
                }}
              >
                {interest}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <TouchableOpacity
        disabled={selectedInterests.length < 3}
        className={`mt-6 py-4 mx-5 rounded-lg ${
          selectedInterests.length >= 3 ? "bg-[#9eadffd9]" : "bg-gray-300"
        }`}
      >
        <Text className="text-white text-center text-lg font-medium">Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InterestsSelector;
