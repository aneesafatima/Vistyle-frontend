import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { GlobalContext } from "@/context/GlobalProvider";
import { Shadow } from "react-native-shadow-2";
import CustomDropdown from "./customDropdown";
const UserSettings = () => {
  const { userData, updatedUserData, setUpdatedUserData } =
    useContext(GlobalContext)!;
  //Refactor use one context for all the data
  const handleInput = (text: string, field: string) => {
    setUpdatedUserData((prev) => {
      if (prev) {
        return {
          ...prev,
          [field]: text,
        };
      }
      return prev;
    });
  };
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
      <View className="px-10 ">
        <Text className="text-black font-poppins-medium font-semibold text-2xl mt-[90px] text-center ">
          Edit Profile
        </Text>
        <View>
          <Image className="w-52 bg- h-52 rounded-3xl mt-4 mb-2 self-center" />
          <Text className="text-center text-gray-800">@johndoe</Text>
        </View>

        <View className="mb-4">
          <View className="flex flex-col items-center my-6">
            <Shadow
              distance={9}
              offset={[0, 0]}
              startColor="rgba(162, 142, 255, 0.1)" // 20% opacity
              endColor="rgba(162, 142, 255, 0)"
              paintInside={false}
              style={{
                borderRadius: 12, // ← Rounded corners for the shadow
              }}
            >
              <View className="">
                <Text className="text-lg absolute left-6 -translate-y-1/2 bg-[#F5F4F0] z-20 font-bold text-[#3B0A45]  mb-1">
                  Name
                </Text>
                <View className="relative w-[320px]">
                  <TextInput
                    className="border-[1px] focus:border-[#A28EFF] border-[#FFF8E7] text-base text-gray-800 px-4 py-3 rounded-xl pr-10 "
                    editable={true}
                    value={updatedUserData?.name}
                    placeholder={userData?.name}
                    onChangeText={(text) => handleInput(text, "name")}
                    onFocus={() => {}}
                  />

                  <TouchableOpacity className="absolute right-3 top-1/2 -translate-y-1/2">
                    <FontAwesome name="pencil" size={20} color="#black" />
                  </TouchableOpacity>
                </View>
              </View>
            </Shadow>
          </View>
          <View className="flex flex-col items-center my-3">
            <Shadow
              distance={9}
              offset={[0, 0]}
              startColor="rgba(162, 142, 255, 0.1)" // 20% opacity
              endColor="rgba(162, 142, 255, 0)"
              paintInside={false}
              style={{
                borderRadius: 12, // ← Rounded corners for the shadow
              }}
            >
              <View>
                <Text className="text-lg absolute left-6 -translate-y-1/2 bg-[#F5F4F0]  z-20 font-semibold text-[#3B0A45] mb-1">
                  Description
                </Text>
                <View className="relative w-[320px]">
                  <TextInput
                    className="border-[1px] focus:border-[#A28EFF] border-[#FFF8E7] min-h-20  text-base text-gray-800 px-4 py-3 rounded-xl pr-10 "
                    editable={true}
                    onChangeText={(text) => handleInput(text, "description")}
                    multiline={true}
                    value={updatedUserData?.description}
                    placeholder={
                      updatedUserData?.description || "Your fashion mantra"
                    }
                  />

                  <TouchableOpacity className="absolute right-3 top-1/2 -translate-y-1/2">
                    <FontAwesome name="pencil" size={20} color="#black" />
                  </TouchableOpacity>
                </View>
              </View>
            </Shadow>
          </View>
          <View className="my-6 w-[200px] flex justify-center ">
            <Shadow
              distance={9}
              offset={[0, 0]}
              startColor="rgba(162, 142, 255, 0.1)" // 20% opacity
              endColor="rgba(162, 142, 255, 0)"
              paintInside={false}
              style={{
                borderRadius: 12, // ← Rounded corners for the shadow
              }}
            >
              <View>
                <Text className="text-lg absolute left-6 -translate-y-1/2 bg-[#F5F4F0] z-20 font-semibold text-[#3B0A45]  mb-1">
                  Design House
                </Text>

                <CustomDropdown />
              </View>
            </Shadow>
          </View>
          <View className="my-6">
            <Text className="text-lg  absolute left-6 -translate-y-1/2 bg-[#F5F4F0]  z-20 font-semibold text-[#3B0A45]   mb-1">
              Password
            </Text>
            <Shadow
              distance={9}
              offset={[0, 0]}
              startColor="rgba(162, 142, 255, 0.1)" // 20% opacity
              endColor="rgba(162, 142, 255, 0)"
              paintInside={false}
              style={{
                borderRadius: 12, // ← Rounded corners for the shadow
              }}
            >
              <View className="relative w-[320px]">
                <TextInput
                  className="border-[1px] focus:border-[#A28EFF] border-[#FFF8E7] text-base text-gray-800 px-4 py-3 rounded-xl pr-10 "
                  editable={true}
                  // placeholder={userData?.name}
                />
                <TouchableOpacity className="absolute right-3 top-1/2 -translate-y-1/2">
                  <FontAwesome name="pencil" size={20} color="#black" />
                </TouchableOpacity>
              </View>
            </Shadow>
          </View>
          <View className="my-6">
            <Text className="text-lg  absolute left-6 -translate-y-1/2 bg-[#F5F4F0]  z-20 font-semibold text-[#3B0A45]   mb-1">
              New Password
            </Text>
            <Shadow
              distance={9}
              offset={[0, 0]}
              startColor="rgba(162, 142, 255, 0.1)" // 20% opacity
              endColor="rgba(162, 142, 255, 0)"
              paintInside={false}
              style={{
                borderRadius: 12, // ← Rounded corners for the shadow
              }}
            >
              <View className="relative w-[320px]">
                <TextInput
                  className="border-[1px] focus:border-[#A28EFF] border-[#FFF8E7] text-base text-gray-800 px-4 py-3 rounded-xl pr-10 "
                  editable={true}
                  // placeholder={userData?.name}
                />
                <TouchableOpacity className="absolute right-3 top-1/2 -translate-y-1/2">
                  <FontAwesome name="pencil" size={20} color="#black" />
                </TouchableOpacity>
              </View>
            </Shadow>
          </View>
          <View className="my-6">
            <Text className="text-lg  absolute left-6 -translate-y-1/2 bg-[#F5F4F0]  z-20 font-semibold text-[#3B0A45]   mb-1">
              Confirm Password
            </Text>
            <Shadow
              distance={9}
              offset={[0, 0]}
              startColor="rgba(162, 142, 255, 0.1)" // 20% opacity
              endColor="rgba(162, 142, 255, 0)"
              paintInside={false}
              style={{
                borderRadius: 12, // ← Rounded corners for the shadow
              }}
            >
              <View className="relative w-[320px]">
                <TextInput
                  className="border-[1px] focus:border-[#A28EFF] border-[#FFF8E7] text-base text-gray-800 px-4 py-3 rounded-xl pr-10 "
                  editable={true}
                  // placeholder={userData?.name}
                />
                <TouchableOpacity className="absolute right-3 top-1/2 -translate-y-1/2">
                  <FontAwesome name="pencil" size={20} color="#black" />
                </TouchableOpacity>
              </View>
            </Shadow>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserSettings;
