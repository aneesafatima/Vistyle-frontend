import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Dimensions,
  ScrollView,
  StatusBar,
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
const userDetailsSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    description: z.string().optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .optional(),
    newpassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .optional(),
    passwordConfirm: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .optional(),
    designHouse: z.string().nonempty("Design House is required"),
  })
  .refine(
    (data) => {
      // Only validate if any password field is filled
      if (data.password || data.newpassword || data.passwordConfirm) {
        return data.newpassword === data.passwordConfirm;
      }
      return true;
    },
    {
      message: "Passwords must match",
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

  const [updateUserDetails] = useUpdateUserDetailsMutation();
  const [updateUserPassword] = useUpdateUserPasswordMutation();
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

  const handleUpdationResult = async (data: updatedUserDataType) => {
    const excludedFields = ["password", "newpassword", "passwordConfirm"];
    console.log("In handleUpdationResult", data);
    const generalData = Object.fromEntries(
      Object.entries(data).filter(([key]) => !excludedFields.includes(key))
    ) as updatedUserDataType;
    try {
      console.log("Nornmal user data being updated");
      const result = await updateUserDetails({
        userId: userData?.id ?? "",
        data: generalData,
      }).unwrap();
      console.log(result);
      if (data.password && data.newpassword && data.passwordConfirm) {
        console.log("Updating password");
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
      console.log(error);
    } finally {
      setIsEditingProfile(false);
    }
  };
  if (!isEditingProfile) return null; // Prevent rendering if not editing profile
  const EditableElements: EditProfileType[] = [
    {
      label: "Name",
      name: "name",
      placeholder: "Enter your name",
      type: "text",
    },
    {
      label: "Description",
      name: "description",
      placeholder: "Your fashion mantra",
      type: "text",
    },
    {
      label: "Design House",
      name: "designHouse",
      type: "text",
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter your current password",
      type: "password",
    },
    {
      label: "New Password",
      name: "newpassword",
      placeholder: "Enter a new password",
      type: "password",
    },
    {
      label: "Confirm New Password",
      name: "passwordConfirm",
      placeholder: "Confirm your new password",
      type: "password",
    },
  ];

  return (
    <SafeAreaView>
      <Animated.View style={animatedStyles}>
        <StatusBar
          barStyle="dark-content"
          translucent={false}
          animated={true}
          backgroundColor="#fcd9be88"
        />
        <View className="px-10   flex-1 w-screen bg-[#fcd9be88] z-20 ">
          {/* Header */}
          <View className="mt-12 flex flex-row justify-between">
            <Pressable onPress={() => setIsEditingProfile(false)}>
              <Ionicons name="chevron-back-outline" size={24} color="black" />
            </Pressable>
            <Text className="text-black font-interTight-bold font-semibold text-2xl mb-3 text-center">
              Edit Profile
            </Text>
            <TouchableOpacity
              onPress={handleSubmit(handleUpdationResult, (errors) =>
                console.log(errors)
              )}
            >
              <Ionicons name="checkmark" size={24} color="black" />
            </TouchableOpacity>
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
                  <Text className="text-lg font-interTight-medium absolute left-6 -translate-y-1/2  bg-[#feeae2]  font-bold z-20 text-[#8c9dffa7]">
                    Design House
                  </Text>
                  <CustomDropdown />
                </View>
              );

            return (
              <View key={index} className="flex flex-col  my-6">
                <View className="relative    h-16 mx-2">
                  <Text className="text-lg font-interTight-medium absolute left-6 -translate-y-1/2 bg-[#feeae2]  z-20 text-[#8c9dffbe]  font-bold mb-1">
                    {element.label}
                  </Text>
                  <View className="relative flex justify-center  ">
                    <Controller
                      control={control}
                      name={element.name}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          className="border-[1px] w-full h-full rounded-xl border-[#8c9dff69] focus:border-[#8c9dffc2] text-base text-[#444444] px-4 py-3 pr-10"
                          editable={true}
                          value={value || ""}
                          onChangeText={onChange}
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
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default UserSettings;
