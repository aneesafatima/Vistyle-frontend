import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Dimensions,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "@/context/GlobalProvider";
import CustomDropdown from "./customDropdown";
import {
  useUpdateUserDetailsMutation,
  useUpdateUserPasswordMutation,
} from "@/query/features/userApi";
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
import { EditableElements } from "@/assets/ui-data/data";
import useAuth from "@/hooks/useAuth";
const userDetailsSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    description: z.string().optional(),
    password: z
      .string()
      .transform((val) => (val === "" ? undefined : val))
      .optional()
      .refine((val) => !val || val.length >= 8, {
        message: "Password must be at least 8 characters",
      }),
    newpassword: z
      .string()
      .transform((val) => (val === "" ? undefined : val))
      .optional()
      .refine((val) => !val || val.length >= 8, {
        message: "Password must be at least 8 characters",
      }),
    passwordConfirm: z
      .string()
      .transform((val) => (val === "" ? undefined : val))
      .optional()
      .refine((val) => !val || val.length >= 8, {
        message: "Password must be at least 8 characters",
      }),
    designHouse: z.string().nonempty("Design House is required"),
  })
  .refine(
    (data) => {
      if (data.password || data.newpassword || data.passwordConfirm) {
        return data.password && data.newpassword === data.passwordConfirm;
      }
      return true;
    },
    {
      message: "Passwords must match and all password fields must be filled",
      path: ["passwordConfirm"],
    }
  );

const UserSettings = ({
  setIsEditingProfile,
  isEditingProfile,
}: {
  setIsEditingProfile: React.Dispatch<React.SetStateAction<boolean>>;
  isEditingProfile: boolean;
}) => {
  const { userData, setUserData } = useContext(GlobalContext)!;

  const [updateUserDetails, { isLoading: isLoadingUser }] =
    useUpdateUserDetailsMutation();
  const [updateUserPassword, { isLoading: isLoadingPassword }] =
    useUpdateUserPasswordMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<updatedUserDataType>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      name: userData?.name || "",
      description: userData?.description || "",
      designHouse: userData?.designHouse || "theminimalist",
    },
  });

  const { width: screenWidth } = Dimensions.get("window");
  const translate = useSharedValue(screenWidth);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translate.value }],
  }));

  useEffect(() => {
    translate.value = withTiming(isEditingProfile ? 0 : screenWidth, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  }, [isEditingProfile]);
  const { loggingUserOut } = useAuth();

  const handleUpdationResult = async (data: updatedUserDataType) => {
    const excludedFields = ["password", "newpassword", "passwordConfirm"];
    const generalData = Object.fromEntries(
      Object.entries(data).filter(([key]) => !excludedFields.includes(key))
    ) as updatedUserDataType;
    try {
      const result = await updateUserDetails({
        userId: userData?.id ?? "",
        data: generalData,
      }).unwrap();
      if (data.password && data.newpassword && data.passwordConfirm) {
        await updateUserPassword({
          userId: userData?.id ?? "",
          data: {
            password: data.password,
            newpassword: data.newpassword,
          },
        }).unwrap();
      }
      setUserData(result.data);
      setIsEditingProfile(false);
    } catch (error: any) {
      Alert.alert("Error", error?.data?.message || "Failed to update profile"); // use a toast
    } finally {
      setIsEditingProfile(false);
    }
  };
  if (!isEditingProfile) return null; // Prevent rendering if not editing profile

  return (
    <SafeAreaView className="bg-[#222831] relative">
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        style={[animatedStyles]}
      >
        <View className="px-10 w-screen z-20 ">
          {/* Header */}
          <View className="mt-12 flex flex-row justify-between">
            <Pressable
              onPress={() => {
                setIsEditingProfile(false);
              }}
            >
              <Ionicons name="chevron-back-outline" size={24} color="#f2f2f2" />
            </Pressable>
            <Text className="text-[#f2f2f2] font-interTight-bold font-semibold text-2xl mb-3 text-center">
              Edit Profile
            </Text>
            <Pressable
              onPress={handleSubmit(handleUpdationResult, (errors) =>
                console.log(errors)
              )}
            >
              {isLoadingUser || isLoadingPassword ? (
                <ActivityIndicator size="small" color="#f2f2f2" />
              ) : (
                <Ionicons name="checkmark" size={24} color="#f2f2f2" />
              )}
            </Pressable>
          </View>

          {/* Avatar */}
          <View className="flex flex-row relative justify-center">
            <Image
              className="w-36 bg-pink-100 h-36 rounded-full my-2 self-center shadow-md"
              source={require("../assets/images/pfp-demo-1.jpg")}
            />
          </View>
          <Text className="text-center text-gray-800 mb-5">@johndoe</Text>
          {EditableElements.map((element, index) => {
            if (element.name == "designHouse")
              return (
                <View
                  className={`my-6 w-[200px] flex  rounded-xl relative`}
                  key={index}
                >
                  <Text className="text-lg font-interTight-medium absolute left-6 -translate-y-1/2  bg-[#222831]  font-bold z-20 text-[#9eadffd9]">
                    Design House
                  </Text>
                  <CustomDropdown />
                </View>
              );

            return (
              <View key={index} className="flex flex-col  my-6">
                <View className="relative h-16 mx-2">
                  <Text className="text-lg font-interTight-medium absolute left-6 -translate-y-1/2 bg-[#222831]  z-20 text-[#9eadffd9]  font-bold mb-1">
                    {element.label}
                  </Text>
                  <View className="relative flex justify-center  ">
                    <Controller
                      control={control}
                      name={element.name}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          className="border-[1px] w-full h-full rounded-xl border-[#8c9dff69] focus:border-[#8c9dffc2] text-base text-[#f2f2f2] px-4 py-3 pr-10"
                          editable={true}
                          value={value || ""}
                          onChangeText={onChange}
                          placeholderTextColor={"#f2f2f2a2"}
                          placeholder={element.placeholder}
                          secureTextEntry={element.type === "password"}
                        />
                      )}
                    />
                  </View>
                  {errors[element.name] && (
                    <Text className="absolute top-14 left-3 my-3 text-[#f467409a] font-interTight-medium">
                      {errors[element.name]?.message}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
          <TouchableOpacity
            className="bg-[#9eadffd9]  p-3 py-4 rounded-xl"
            onPress={loggingUserOut}
          >
            <Text className="text-white text-center">Log Out</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default UserSettings;
