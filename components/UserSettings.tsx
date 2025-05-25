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
      password: "........",
      newpassword: "........",
      passwordConfirm: ".........",
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
    <Animated.View style={animatedStyles}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="#fcd9be88"
      />
      <View className="px-10 absolute top-0 pt-2 bottom-0 h-screen flex-1 w-screen bg-[#fcd9be88] z-20">
        {/* Header */}
        <View className="mt-12 flex flex-row justify-between">
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
        {EditableElements.map((element, index) => {
          if (element.name == "designHouse")
            return (
              <View
                className="my-6 w-[200px] flex justify-centerborder-[1px]  border-[#8c9dff69] rounded-xl "
                key={index}
              >
                <View>
                  <Text className="text-lg font-interTight-medium absolute left-6 -translate-y-1/2  bg-transparent font-bold z-20 text-[#8c9dffa7]">
                    Design House
                  </Text>
                  <CustomDropdown />
                </View>
              </View>
            );

          return (
            <View key={index} className="flex flex-col items-center my-6">
              /
              <View className="relative border-[1px] border-[#8c9dff69] rounded-xl h-16 w-[320px]">
                <Text className="text-lg font-interTight-medium absolute left-6 -translate-y-1/2 bg-transparent z-20 text-[#8c9dffc5] font-bold mb-1">
                  {element.label}
                </Text>
                <View className="relative w-[320px] rounded-xl flex justify-center h-full px-4">
                  <Controller
                    control={control}
                    name={element.name}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        className="focus:border-[#7F56D9] text-base text-[#444444] px-4 py-3 pr-10"
                        editable
                        value={value}
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
  );
};

export default UserSettings;
