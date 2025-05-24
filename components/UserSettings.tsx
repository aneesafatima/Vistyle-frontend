import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useContext, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { GlobalContext } from "@/context/GlobalProvider";
import { Shadow } from "react-native-shadow-2";
import CustomDropdown from "./customDropdown";
import { useUpdateUserDetailsMutation } from "@/query/features/userApi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Controller, useForm } from "react-hook-form";
import { bottomRight, topLeft } from "@shopify/react-native-skia";
const userDetailsSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    description: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    newpassword: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirm: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    designHouse: z.string().nonempty("Design House is required"),
  })
  .refine((data) => data.newpassword === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });
// ...imports remain unchanged...

const UserSettings = ({
  setIsEditingProfile,
  isEditingProfile,
}: {
  setIsEditingProfile: React.Dispatch<React.SetStateAction<boolean>>;
  isEditingProfile: boolean;
}) => {
  const { userData, updatedUserData, setUpdatedUserData } =
    useContext(GlobalContext)!;

  const [updateUserDetails, { isLoading }] = useUpdateUserDetailsMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<updatedUserDataType>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      name: userData?.name || "",
      description: userData?.description || "",
      // password: "",
      // newpassword: "",
      // passwordConfirm: "",
      designHouse: userData?.designHouse || "theminimalist",
    },
  });

  const { width: screenWidth } = Dimensions.get("window");
  const translate = useSharedValue(screenWidth);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translate.value }],
  }));

  useEffect(() => {
    setUpdatedUserData({
      name: userData?.name || "",
      description: userData?.description || "",
      designHouse: userData?.designHouse || "theminimalist",
    });
  }, []);

  useEffect(() => {
    translate.value = withTiming(isEditingProfile ? 0 : screenWidth, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  }, [isEditingProfile]);

  const handleUpdationResult = async (data: updatedUserDataType) => {
    console.log("In handleUpdationResult");
    try {
      const result = await updateUserDetails({
        userId: userData?.id ?? "",
        data,
      }).unwrap();
      console.log(result);
      setIsEditingProfile(false);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsEditingProfile(false);
    }
  };

  return (
    <Animated.View style={animatedStyles}>
      <View className="px-10 absolute top-0 pt-2 bottom-0 h-screen bg-[#fcd9be88] z-20">
        {/* Header */}
        <View className="mt-16 flex flex-row justify-between">
          <Pressable onPress={() => setIsEditingProfile(false)}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </Pressable>
          <Text className="text-black font-interTight-bold font-semibold text-2xl mb-3 text-center">
            Edit Profile
          </Text>
          <TouchableOpacity onPress={handleSubmit(handleUpdationResult)}>
            <Ionicons name="checkmark" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <View className="flex flex-row relative justify-center">
          <Image
            className="w-44 bg-pink-100 h-44 rounded-3xl my-2 self-center shadow-md"
            source={require("../assets/images/pfp-demo-1.jpg")}
          />
        </View>
        <Text className="text-center text-gray-800 mb-5">@johndoe</Text>

        {/* Name */}
        <View className="flex flex-col items-center my-6 mb-9">
          <Shadow
            distance={9}
            offset={[0, 0]}
            startColor="rgba(162, 142, 255, 0.1)"
            endColor="rgba(162, 142, 255, 0)"
            paintInside={false}
            style={{ borderRadius: 12 }}
          >
            <View className="relative border-t-[1px] border-r-4 border-b-4 border-l-[1px]  border-[#8c9dff69] rounded-xl   w-[320px]">
              <Text className="text-lg font-interTight-medium absolute left-6   -translate-y-1/2 bg-transparent z-20 text-[#8c9dffc5] font-bold mb-1">
                Name
              </Text>
              <View className="relative w-[320px] rounded-xl">
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      className=" focus:border-[#7F56D9]  text-base text-[#444444] px-4 py-3 pr-10"
                      editable
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                <TouchableOpacity className="absolute right-3 top-1/2 -translate-y-1/2 mr-3">
                  <FontAwesome name="pencil" size={20} color="#000" />
                </TouchableOpacity>
              </View>
              {errors.name && (
                <Text className="absolute top-14 left-3 text-red-500 font-interTight-medium">
                  {errors.name.message}
                </Text>
              )}
            </View>
          </Shadow>
        </View>

        {/* Description */}
        <View className="flex flex-col items-center my-3">
          <Shadow
            distance={9}
            offset={[0, 0]}
            startColor="rgba(162, 142, 255, 0.1)"
            endColor="rgba(162, 142, 255, 0)"
            paintInside={false}
            style={{ borderRadius: 12 }}
          >
            <View className="border-t-[1px] border-r-4 border-b-4 border-l-[1px]  border-[#8c9dff69] rounded-xl ">
              <Text className="text-lg font-interTight-medium absolute left-6 -translate-y-1/2 bg-transparent font-bold z-20 text-[#8c9dffa7] mb-1">
                Description
              </Text>
              <View className="relative w-[320px]">
                <Controller
                  control={control}
                  name="description"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      className=" focus:border-[#A28EFF]  min-h-20 text-base text-gray-800 px-4 py-3 rounded-xl pr-10"
                      editable
                      multiline
                      value={value}
                      onChangeText={onChange}
                      placeholder="Your fashion mantra"
                    />
                  )}
                />
                <TouchableOpacity className="absolute right-3 top-1/2 -translate-y-1/2">
                  <FontAwesome name="pencil" size={20} color="#000" />
                </TouchableOpacity>
              </View>
              {errors.description && (
                <Text className="text-red-500 text-sm px-1 mt-1">
                  {errors.description.message}
                </Text>
              )}
            </View>
          </Shadow>
        </View>

        {/* Design House (untouched) */}
        <View className="my-6 w-[200px] flex justify-center border-t-[1px] border-r-4 border-b-4 border-l-[1px]  border-[#8c9dff69] rounded-xl ">
          <Shadow
            startColor="rgba(162, 142, 255, 0.2)" // A28EFF at 20%
            offset={[0, 1]} // like X: 1, Y: 1
            
            distance={5}
            paintInside={false}
            style={{ borderRadius: 12 }}
          >
            <View>
              <Text className="text-lg font-interTight-medium absolute left-6 -translate-y-1/2  bg-transparent font-bold z-20 text-[#8c9dffa7]  mb-1">
                Design House
              </Text>
              <CustomDropdown />
            </View>
          </Shadow>
        </View>

        {/* Password Fields */}
        {/* {["password", "newpassword", "passwordConfirm"].map((field, i) => {
          const labels = {
            password: "Current Password",
            newpassword: "New Password",
            passwordConfirm: "Confirm Password",
          };
          return (
            <View className="my-6" key={field}>
              <Text className="text-lg font-interTight-medium absolute left-6 -translate-y-1/2 bg-white z-20 text-[#7F56D9] mb-1">
                {labels[field]}
              </Text>
              <Shadow distance={9} offset={[0, 0]} startColor="rgba(162, 142, 255, 0.1)" endColor="rgba(162, 142, 255, 0)" paintInside={false} style={{ borderRadius: 12 }}>
                <View className="relative w-[320px]">
                  <Controller
                    control={control}
                    name={field as keyof updatedUserDataType}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        className="border-[1px] focus:border-[#A28EFF] border-[#FFF8E7] text-base text-gray-800 px-4 py-3 rounded-xl pr-10"
                        secureTextEntry
                        value={value}
                        onChangeText={onChange}
                        placeholder="••••••••"
                      />
                    )}
                  />
                  <TouchableOpacity className="absolute right-3 top-1/2 -translate-y-1/2">
                    <FontAwesome name="pencil" size={20} color="#000" />
                  </TouchableOpacity>
                  {errors[field] && (
                    <Text className="text-red-500 text-sm px-1 mt-1 absolute -bottom-6 left-1">
                      {errors[field]?.message}
                    </Text>
                  )}
                </View>
              </Shadow>
            </View>
          );
        })} */}
      </View>
    </Animated.View>
  );
};

export default UserSettings;
