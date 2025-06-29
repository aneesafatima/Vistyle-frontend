import {
  View,
  Text,
  Alert,
  Pressable,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPasswordMutation } from "@/query/features/authApi";
import { GlobalContext } from "@/context/GlobalProvider";

interface UserEmailProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const UserEmail = ({ setStep }: UserEmailProps) => {
  const { setEmail } = useContext(GlobalContext)!;
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const logInSchema = z.object({
    email: z.string().email("Invalid email address"),
  });
  type LoginFormValues = z.infer<typeof logInSchema>;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(logInSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await forgotPassword(data);
      Alert.alert(
        "Email sent",
        "Please check your email to reset your password"
      );
      setStep(2);
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error?.data?.message || "Something went wrong");
    }
  };

  return (
    <View className="px-10 pt-10">
      {/* Email Field */}
      <View className="mb-4">
        <View className="relative mt-2">
          <Text className="absolute -top-2 left-3 bg-[#fafafa] text-[#222831] px-1 text-xs z-10">
            Email
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border border-gray-300 text-[#222831] rounded-2xl px-4 py-5"
                placeholder="Enter your email to reset password"
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={(text) => {
                  onChange(text);
                  setEmail(text);
                }}
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

      {/* Submit Button */}
      <TouchableOpacity
        className="py-4 rounded-lg bg-[#9eadffd9] font-arial-rounded tracking-wider mt-4"
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        <Text className="text-white text-center text-lg font-medium">
          {isLoading ? (
            <View className="-mt-8">
              <ActivityIndicator size="small" color="#c1c1c1" />
            </View>
          ) : (
            "Submit"
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserEmail;
