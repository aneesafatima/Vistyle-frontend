import { View, Text, Alert, Pressable, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";

const logInSchema = z
  .object({
    email: z.string().email("Invalid email address"),
  })
 ;

type LoginFormValues = z.infer<typeof logInSchema>;

const resetPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(logInSchema),
    defaultValues: { email: ""}
  });

  const onSubmit = (data: LoginFormValues) => {
    Alert.alert("Login Success", `Email: ${data.email}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 justify-center px-6">
      <Text className="text-2xl font-bold text-center mb-4">Reset your password</Text>

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

   

      <Pressable
        className="bg-black py-3 rounded-lg"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white text-center text-lg font-medium">
          Reset Password
        </Text>
      </Pressable>

      
    </SafeAreaView>
  );
};

export default resetPassword;
