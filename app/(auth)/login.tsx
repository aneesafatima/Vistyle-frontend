import {
  View,
  Text,
  Alert,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useLoginUserMutation } from "../../query/features/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useRouter } from "expo-router"; // Import useRouter from expo-router

const logInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type LoginFormValues = z.infer<typeof logInSchema>;

const logIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(logInSchema),
    defaultValues: { email: "", password: "" },
  });
  const router = useRouter();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap();
      Alert.alert("Login Success", "You have logged in successfully!");
      await AsyncStorage.setItem("user", JSON.stringify(result.user));

      router.push("/(user)/home");

      console.log(result);
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error?.data?.message || "Something went wrong"
      );
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 justify-center px-6">
      <Text className="text-2xl font-bold text-center mb-4">Log in</Text>

      {/* Email Field */}
      <View className="mb-4">
        <Text className="text-lg text-gray-800">Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-4 mt-2 bg-white"
              placeholder="Enter your email"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && (
          <Text className="mt-1 text-red-500">{errors.email.message}</Text>
        )}
      </View>

      {/* Password Field */}
      <View className="mb-4">
        <Text className="text-lg text-gray-800">Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-4 mt-2 bg-white"
              placeholder="Enter your password"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && (
          <Text className="mt-1 text-red-500">{errors.password.message}</Text>
        )}
      </View>

      {/* Submit Button */}
      <Pressable
        className={`bg-black py-3 rounded-lg flex-row justify-center items-center`}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading && (
          <ActivityIndicator size="small" color="#ffffff" className="mr-2" />
        )}
        <Text className="text-white text-center text-lg font-medium">
          {isLoading ? "Logging in..." : "Log in"}
        </Text>
      </Pressable>

      {/* Reset Password Link */}
      <Text className="text-center mt-2 text-lg font-medium">
        <Link href="/reset-password">
          <Text className="underline">Reset password</Text>
        </Link>
      </Text>

      {/* Register Link */}
      <Text className="text-center mt-2 text-lg font-medium">
        Don't have an account?{" "}
        <Link href="/sign-up">
          <Text className="underline">Register</Text>
        </Link>
      </Text>
    </SafeAreaView>
  );
};

export default logIn;
