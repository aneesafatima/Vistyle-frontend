import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StatusBar,
  Alert,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { FashionInterest } from "@/assets/ui-data/data";

const styleboardSchema = z.object({
  interests: z.array(z.string()).min(1, "At least one interest is required"),
  fashionHouse: z.enum(
    [
      "The Dreamer",
      "The Rebel",
      "The Minimalist",
      "The Iconic",
      "The Trendsetter",
      "The Vintage Soul",
    ],
    { required_error: "Fashion House is required" }
  ),
  prompt: z.string().optional(),
});

const fashionHouses = [
  "The Dreamer",
  "The Rebel",
  "The Minimalist",
  "The Iconic",
  "The Trendsetter",
  "The Vintage Soul",
];

const StyleboardCreation = ({
  setIsCreatingStyleboard,
  isCreatingStyleboard,
}: {
  setIsCreatingStyleboard: React.Dispatch<React.SetStateAction<boolean>>;
  isCreatingStyleboard: boolean;
}) => {
  const [currentInterest, setCurrentInterest] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [showFashionHouses, setShowFashionHouses] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(styleboardSchema),
    defaultValues: {
      interests: [],
      fashionHouse: "",
      prompt: "",
    },
  });

  const watchedFashionHouse = watch("fashionHouse");

  const { width: screenWidth } = Dimensions.get("window");
  const translate = useSharedValue(screenWidth);



  const addInterest = () => {
    if (currentInterest.trim() && !interests.includes(currentInterest)) {
      const newInterests = [...interests, currentInterest];
      setInterests(newInterests);
      setValue("interests", newInterests);
      setCurrentInterest("");
    }
  };

  const removeInterest = (interestToRemove) => {
    const newInterests = interests.filter(
      (interest) => interest !== interestToRemove
    );
    setInterests(newInterests);
    setValue("interests", newInterests);
  };

  const selectFashionHouse = (house:string) => {
    setValue("fashionHouse", house);
    setShowFashionHouses(false);
  };

  const handleStyleboardCreation = async (data) => {
    try {
      console.log("Styleboard Data:", data);
      // Handle styleboard creation API call here
      Alert.alert("Success", "Styleboard created successfully!");
      setIsCreatingStyleboard(false);
    } catch (error) {
      Alert.alert("Error", "Failed to create styleboard");
    }
  };



  return (
    <SafeAreaView className="flex-1 bg-[#222831]">
        <StatusBar
          barStyle="light-content"
          translucent={false}
          animated={true}
          backgroundColor="#222831"
        />
        <ScrollView className="px-6 w-screen z-20">
          {/* Header */}
          <View className="mt-8 flex flex-row justify-between items-center">
            <Pressable onPress={() => setIsCreatingStyleboard(false)}>
              <Ionicons name="chevron-back-outline" size={24} color="#f2f2f2" />
            </Pressable>
            <Text className="text-[#f2f2f2] font-interTight-bold font-semibold text-2xl">
              Create Styleboard
            </Text>
            <Pressable
              onPress={handleSubmit(handleStyleboardCreation, (errors) =>
                console.log(errors)
              )}
            >
              <Ionicons name="checkmark" size={24} color="#f2f2f2" />
            </Pressable>
          </View>

          {/* Collage Placeholder */}
          <View className="my-8">
            <Text className="text-lg font-interTight-medium text-[#9eadffd9] font-bold mb-4">
              Collage Preview
            </Text>
            <View className="bg-[#393E46] rounded-xl p-8 items-center justify-center h-48 border-[1px] border-[#9eadffd9]">
              <Ionicons name="image-outline" size={48} color="#9eadffd9" />
              <Text className="text-[#9eadffd9] mt-2 text-center">
                Collage Placeholder
              </Text>
              <Text className="text-[#9eadffd9] text-sm mt-1 opacity-70">
                Your collage will appear here
              </Text>
            </View>
          </View>

          {/* Fashion House Selection */}
          <View className="my-6">
            <Text className="text-lg font-interTight-medium text-[#9eadffd9] font-bold mb-4">
              Fashion House *
            </Text>
            <TouchableOpacity
              onPress={() => setShowFashionHouses(!showFashionHouses)}
              className="border-[1px] border-[#9eadffd9] rounded-xl p-4 flex-row justify-between items-center"
            >
              <Text className="text-[#f2f2f2] text-base">
                {watchedFashionHouse || "Select Fashion House"}
              </Text>
              <Ionicons
                name={showFashionHouses ? "chevron-up" : "chevron-down"}
                size={20}
                color="#9eadffd9"
              />
            </TouchableOpacity>

            {showFashionHouses && (
              <View className="border-[1px] border-[#9eadffd9] border-t-0 rounded-b-xl">
                {fashionHouses.map((house, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => selectFashionHouse(house)}
                    className="p-4 border-b border-[#9eadffd9] last:border-b-0"
                  >
                    <Text className="text-[#f2f2f2] text-base">{house}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {errors.fashionHouse && (
              <Text className="text-[#f467409a] font-interTight-medium mt-2 ml-2">
                {errors.fashionHouse?.message}
              </Text>
            )}
          </View>

          {/* Interests */}
          <View className="my-6">
            <Text className="text-lg font-interTight-medium text-[#9eadffd9] font-bold mb-4">
              Interests & Tags *
            </Text>

            <View className="flex-row mb-4">
              <TextInput
                className="flex-1 border-[1px] border-[#9eadffd9] rounded-xl px-4 py-3 text-[#f2f2f2] mr-2"
                value={currentInterest}
                onChangeText={setCurrentInterest}
                placeholder="Add an interest..."
                placeholderTextColor="#f2f2f2a2"
                onSubmitEditing={addInterest}
              />
              <TouchableOpacity
                onPress={addInterest}
                className="bg-[#9eadffd9] rounded-xl px-6 py-3 justify-center"
              >
                <Text className="text-[#222831] font-bold">Add</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row flex-wrap">
              {interests.map((interest, index) => (
                <View
                  key={index}
                  className="flex-row items-center bg-[#9eadffd9] rounded-full px-3 py-2 mr-2 mb-2"
                >
                  <Text className="text-[#222831] font-medium mr-2">
                    {interest}
                  </Text>
                  <TouchableOpacity onPress={() => removeInterest(interest)}>
                    <Ionicons name="close" size={16} color="#222831" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            {errors.interests && (
              <Text className="text-[#f467409a] font-interTight-medium mt-2 ml-2">
                {errors.interests?.message}
              </Text>
            )}
          </View>

          {/* Prompt */}
          {/* <View className="my-6 mb-12">
            <View className="relative h-32">
              <Text className="text-lg font-interTight-medium absolute left-6 -translate-y-1/2 bg-[#222831] z-20 text-[#9eadffd9] font-bold">
                Creative Prompt
              </Text>
              <Controller
                control={control}
                name="prompt"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="border-[1px] w-full h-full rounded-xl border-[#9eadffd9] focus:border-[#9eadffd9] text-base text-[#f2f2f2] px-4 py-3"
                    multiline
                    textAlignVertical="top"
                    value={value || ""}
                    onChangeText={onChange}
                    placeholderTextColor="#f2f2f2a2"
                    placeholder="Describe your style vision, inspiration, or any specific details..."
                  />
                )}
              />
            </View>
          </View> */}
        </ScrollView>
    
    </SafeAreaView>
  );
};

export default StyleboardCreation;
