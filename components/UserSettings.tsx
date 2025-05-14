import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { GlobalContext } from "@/context/GlobalProvider";

const UserSettings = () => {
  const { userData } = useContext(GlobalContext)!;
  return (
    <View>
      <Text className="text-white font-poppins-medium font-semibold text-2xl mt-20 text-center ">
        Edit Profile
      </Text>
      <Image className="w-52 bg-pink-100 h-52 rounded-3xl my-4 self-center"></Image>
      <View className="mb-4">
        <View className="flex flex-col items-center my-3">
          <View>
            <Text className="text-lg  font-semibold text-white mb-1">Name</Text>
            <View className="relative w-[320px]">
              <TextInput
                className="bg-gray-100 text-base text-gray-800 px-4 py-3 rounded-xl pr-10 "
                editable={false} // since it's view-only until user taps edit
                // value="Emily Ginnati"
                placeholder={userData?.name}
              />

              <TouchableOpacity className="absolute right-3 top-1/2 -translate-y-1/2">
                <FontAwesome name="pencil" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="flex flex-col items-center my-3" >
          <View>
            <Text className="text-lg  font-semibold text-white mb-1">Name</Text>
            <View className="relative w-[320px]">
              <TextInput
                className="bg-gray-100 text-base text-gray-800 px-4 py-3 rounded-xl pr-10 "
                editable={false} // since it's view-only until user taps edit
                // value="Emily Ginnati"
                placeholder={userData?.name}
              />

              <TouchableOpacity className="absolute right-3 top-1/2 -translate-y-1/2">
                <FontAwesome name="pencil" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="flex flex-col items-center my-5">
          <View>
            <Text className="text-lg  font-semibold text-white mb-1">Name</Text>
            <View className="relative w-[320px]">
              <TextInput
                className="bg-gray-100 text-base text-gray-800 px-4 py-3 rounded-xl pr-10 "
                editable={false} // since it's view-only until user taps edit
                // value="Emily Ginnati"
                placeholder={userData?.name}
              />

              <TouchableOpacity className="absolute right-3 top-1/2 -translate-y-1/2">
                <FontAwesome name="pencil" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="flex flex-col items-center my-3">
          <View>
            <Text className="text-lg  font-semibold text-white mb-1">Name</Text>
            <View className="relative w-[320px]">
              <TextInput
                className="bg-gray-100 text-base text-gray-800 px-4 py-3 rounded-xl pr-10 "
                editable={false} // since it's view-only until user taps edit
                // value="Emily Ginnati"
                placeholder={userData?.name}
              />

              <TouchableOpacity className="absolute right-3 top-1/2 -translate-y-1/2">
                <FontAwesome name="pencil" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserSettings;
