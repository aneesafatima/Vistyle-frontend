import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FashionInterest } from "@/assets/ui-data/data";
import { useRouter } from "expo-router";
import { useSignUpUserMutation } from "../query/features/authApi";
import { GlobalContext } from "@/context/GlobalProvider";
import { saveToken } from "@/utils/storage";
const InterestsSelector = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [signUpUser, { isLoading }] = useSignUpUserMutation();
  const router = useRouter();
  const { signUpData, setUserData, setIsLoggedIn } = useContext(GlobalContext)!;
  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const onSubmit = async () => {
    try {
      signUpData.current.interests = selectedInterests;
      const result = await signUpUser(signUpData.current).unwrap();
      await saveToken(result["token"]);
      setIsLoggedIn(true);
      setUserData({
        name: result["user"].name,
        email: result["user"].email,
        interests: result["user"].interests,
        username: result["user"].username,
        description: result["user"].description,
        designHouse: result["user"].designHouse,
        id: result["user"].id,
        stickers: result["user"].stickers,
        cart: result["user"].cart,
      });
      router.replace("/(user)/home");
    } catch (error: any) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <View className="p-4">
      <Text className="text-sm font-semibold text-[#737373] mb-8 mt-4 px-8 text-center font-arial-rounded">
        Select at least 3 interests to proceed. These interests will be used to
        filter posts once the community is live.
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
        onPress={onSubmit}
      >
        <Text className="text-white text-center text-lg font-medium">
          {isLoading ? (
            <View className="-mt-8">
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            "Done"
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InterestsSelector;
