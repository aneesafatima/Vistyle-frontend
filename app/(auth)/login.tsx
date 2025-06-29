import {
  View,
  Text,
  Alert,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useLoginUserMutation } from "../../query/features/authApi";
import useAuth from "@/hooks/useAuth";
import { LoginResponseType } from "@/types/auth";

const logInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type LoginFormValues = z.infer<typeof logInSchema>;

const logIn = () => {
  const { loggingUserIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(logInSchema),
    defaultValues: { email: "", password: "" },
  });

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result: LoginResponseType = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap();
      await loggingUserIn(result);
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error?.data?.message || "Something went wrong"
      );
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fafafa] justify-center px-6 pt-10">
      {/* Email Field */}
      <View className="mb-4">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 text-[#222831] rounded-2xl px-4 py-4"
              placeholder="Enter your email"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor={"#3f454f"}
            />
          )}
        />
        {errors.email && (
          <Text className="mt-1 text-red-500">{errors.email.message}</Text>
        )}
      </View>

      {/* Password Field */}
      <View className="mb-4">
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 text-[#222831] rounded-2xl px-4 py-4 mt-2"
              placeholder="Enter your password"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor={"#3f454f"}
            />
          )}
        />
        {errors.password && (
          <Text className="mt-1 text-red-500">{errors.password.message}</Text>
        )}
      </View>

      {/* Submit Button */}
      <Pressable
        className="py-3 rounded-lg bg-black"
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        <Text className="text-white text-center text-lg font-medium">
          {isLoading ? "Logging in..." : "Log in"}
        </Text>
      </Pressable>

      {/* Reset Password Link */}
      <Text className="text-center mt-4 text-lg font-medium">
        <Link href="/forgot-password">
          <Text className="underline text-[#222831]">Reset password</Text>
        </Link>
      </Text>
    </SafeAreaView>
  );
};

export default logIn;
