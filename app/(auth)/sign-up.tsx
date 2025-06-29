import React, { useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useSignUpUserMutation } from "../../query/features/authApi";
import { GlobalContext } from "@/context/GlobalProvider";
import { saveToken } from "@/utils/storage";

const signUpSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirm: z.string(),
    username: z.string().nonempty("Unique username is required"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

type LoginFormValues = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const { setUserData, setIsLoggedIn } = useContext(GlobalContext)!;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      username: "",
    },
  });
  const [signUpUser, { isLoading }] = useSignUpUserMutation();
  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await signUpUser(data).unwrap();
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
      Alert.alert("Error", error?.data?.message || "Something went wrong");
    }
  };

  return (
    <SafeAreaView className="bg-[#fafafa] justify-center px-10 pt-10">
      {/* Name */}
      <View className="mb-4">
        <View className="relative">
          <Text className="absolute -top-2 left-3 bg-[#fafafa] text-[#222831] px-1 text-xs z-10">
            Name
          </Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border border-gray-300 text-[#222831] rounded-2xl px-4 py-5"
                placeholder="Enter your name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#9CA3AF"
              />
            )}
          />
        </View>
        {errors.name && (
          <Text className="mt-1 text-[#F87171]">{errors.name.message}</Text>
        )}
      </View>

      {/* Username */}
      <View className="mb-4">
        <View className="relative">
          <Text className="absolute -top-2 left-3 bg-[#fafafa] text-[#222831] px-1 text-xs z-10">
            Username
          </Text>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border border-gray-300 text-[#222831] rounded-2xl px-4 py-5"
                placeholder="Enter a unique username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#9CA3AF"
              />
            )}
          />
        </View>
        {errors.username && (
          <Text className="mt-1 text-[#F87171]">{errors.username.message}</Text>
        )}
      </View>

      {/* Email */}
      <View className="mb-4">
        <View className="relative">
          <Text className="absolute -top-2 left-3 bg-[#fafafa] text-[#222831] px-1 text-xs z-10">
            Email
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border border-gray-300 text-[#222831] rounded-2xl px-4 py-5"
                placeholder="Enter your email"
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#9CA3AF"
              />
            )}
          />
        </View>
        {errors.email && (
          <Text className="mt-1 text-[#F87171]">{errors.email.message}</Text>
        )}
      </View>

      {/* Password */}
      <View className="mb-4">
        <View className="relative">
          <Text className="absolute -top-2 left-3 bg-[#fafafa] text-[#222831] px-1 text-xs z-10">
            Password
          </Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border border-gray-300 text-[#222831] rounded-2xl px-4 py-5"
                placeholder="Enter your password"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#9CA3AF"
              />
            )}
          />
        </View>
        {errors.password && (
          <Text className="mt-1 text-[#F87171]">{errors.password.message}</Text>
        )}
      </View>

      {/* Confirm Password */}
      <View className="mb-4">
        <View className="relative">
          <Text className="absolute -top-2 left-3 bg-[#fafafa] text-[#222831] px-1 text-xs z-10">
            Confirm Password
          </Text>
          <Controller
            control={control}
            name="passwordConfirm"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border border-gray-300 text-[#222831] rounded-2xl px-4 py-5"
                placeholder="Confirm your password"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#9CA3AF"
              />
            )}
          />
        </View>
        {errors.passwordConfirm && (
          <Text className="mt-1 text-[#F87171]">
            {errors.passwordConfirm.message}
          </Text>
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        className="py-4 rounded-lg bg-[#9eadffd9] tracking-wider mt-4"
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        <Text className="text-white text-center text-lg font-medium">
          {isLoading ? (
            <View className="-mt-8">
              <ActivityIndicator size="small" color="#c1c1c1" />
            </View>
          ) : (
            "Next"
          )}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUp;
