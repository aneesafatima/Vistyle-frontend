import {
  View,
  Text,
  Alert,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useContext } from "react";
import { useForm, Controller, set } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GlobalContext } from "@/context/GlobalProvider";
import { saveToken } from "@/utils/storage";
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
    path: ["passwordConfirm"], // Error will appear under passwordConfirm
  }); // update to confirm that both the entries are the same
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
      const result:LoginResponseType = await resetPassword({ email, ...data }).unwrap();
      await loggingUserIn(result);
    } catch (error: any) {
      Alert.alert("Error", error?.data?.message || "Something went wrong");
    }
  };

  return (
    <View className="flex-1 bg-gray-100 justify-center px-6">
      <Text className="text-2xl font-bold text-center mb-4">
        Reset Password
      </Text>

      {/* Password Field */}
      <View className="mb-4">
        <Text className="text-lg text-gray-800">Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-4 mt-2 bg-white"
              placeholder="Enter your email"
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

      {/* Confirm Password Field */}
      <View className="mb-4">
        <Text className="text-lg text-gray-800">Confirm Password</Text>
        <Controller
          control={control}
          name="passwordConfirm"
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
        {errors.passwordConfirm && (
          <Text className="mt-1 text-red-500">
            {errors.passwordConfirm.message}
          </Text>
        )}
      </View>

      {/* Submit Button */}
      <Pressable
        className={`bg-black py-3 rounded-lg flex-row justify-center items-center`}
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
      </Pressable>
    </View>
  );
};

export default ResetPassword;
