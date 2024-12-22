import { View, Text, Alert, Pressable, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";

const singupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: z
      .string()
      .min(6, "Password confirmation must be at least 6 characters"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

type LoginFormValues = z.infer<typeof singupSchema>;

const signUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(singupSchema),
    defaultValues: { email: "", password: "", passwordConfirm: "" },
  });

  const onSubmit = (data: LoginFormValues) => {
    Alert.alert("Login Success", `Email: ${data.email}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 justify-center px-6">
      <Text className="text-2xl font-bold text-center mb-4">Sign up</Text>

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
        {errors.email && <Text className="mt-1">{errors.email.message}</Text>}
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
          <Text className="mt-1">{errors.password.message}</Text>
        )}
      </View>

      {/* Password Confirm Field */}
      <View className="mb-4">
        <Text className="text-lg text-gray-800">Confirm Password</Text>
        <Controller
          control={control}
          name="passwordConfirm"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-4 mt-2 bg-white"
              placeholder="Confirm your password"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.passwordConfirm && (
          <Text className="mt-1">{errors.passwordConfirm.message}</Text>
        )}
      </View>

      {/* Submit Button */}
      <Pressable
        className="bg-black py-3 rounded-lg"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white text-center text-lg font-medium">
          Login
        </Text>
      </Pressable>
      <Text className="text-center mt-2 text-lg font-medium">
        Alredy have an account?{" "}
        <Link href="/login">
          <Text className="underline">login</Text>
        </Link>
      </Text>
    </SafeAreaView>
  );
};

export default signUp;
