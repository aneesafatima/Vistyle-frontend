import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useContext } from "react";
import { useForm, Controller, set } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GlobalContext } from "@/context/GlobalProvider";
import { useResetPasswordMutation } from "@/query/features/authApi";
import { LoginResponseType } from "@/types/auth";
import useAuth from "@/hooks/useAuth";
// import * as SecureStore from "expo-secure-store"; for production

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  });
type ResetFormValues = z.infer<typeof resetPasswordSchema>;
const ResetPassword = () => {
  const { loggingUserIn } = useAuth();
  const { email } = useContext(GlobalContext)!;
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { passwordConfirm: "", password: "" },
  });

  const onSubmit = async (data: ResetFormValues) => {
    try {
      const result: LoginResponseType = await resetPassword({
        email,
        ...data,
      }).unwrap();
      await loggingUserIn(result);
    } catch (error: any) {
      Alert.alert("Error", error?.data?.message || "Something went wrong");
    }
  };

  return (
    <View className="bg-[#fafafa] justify-center px-6">
      <Text className="text-lg font-medium text-[#222831] my-4 mb-6">
        Reset Password
      </Text>

      {/* Password Field */}
      <View className="mb-6">
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
                placeholder="Enter your new password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#9CA3AF"
                secureTextEntry
              />
            )}
          />
        </View>
        {errors.password && (
          <Text className="mt-1 text-[#F87171]">{errors.password.message}</Text>
        )}
      </View>
      <View className="mb-6">
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
                placeholder="Confirm your new password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#9CA3AF"
                secureTextEntry
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
        className={`py-4 rounded-lg bg-[#9eadffd9] tracking-wider mt-4`}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" className="mr-2" />
        ) : (
          <Text className="text-white text-lg font-medium text-center">
            Submit
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ResetPassword;
