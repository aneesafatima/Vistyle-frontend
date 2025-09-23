import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUserMutation } from "../../query/features/authApi";
import useAuth from "@/hooks/useAuth";
import { LoginResponseType } from "@/types/auth";

const logInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type LoginFormValues = z.infer<typeof logInSchema>;

const logIn = ({
  setSelectedScreen,
}: {
  setSelectedScreen: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { loggingUserIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(logInSchema),
    defaultValues: { email: "", password: "" },
  });

  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result: LoginResponseType = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap();
      await loggingUserIn(result);
    } catch (error: any) {
      console.log("Login error:", error);
    }
  };

  return (
    <SafeAreaView className="bg-[#fafafa] justify-center px-10 pt-10 h-">
      {/* Email Field */}
      <View className="mb-6">
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

      {/* Password Field */}
      <View className="mb-6">
        <View className="relative mt-2">
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
        {(errors.password || (error as any)) && (
          <Text className="mt-1 text-[#F87171]">
            {errors?.password?.message ||
              (error as any)?.data?.message ||
              "Something went wrong"}
          </Text>
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
            <ActivityIndicator size="small" color="white" />
          ) : (
            "Log in"
          )}
        </Text>
      </TouchableOpacity>

      {/* Reset Password Link */}
      <Text className="text-center mt-4 text-sm font-medium">
        <TouchableOpacity onPress={() => setSelectedScreen("forgot-password")}>
          <Text className="underline text-[#a9a9a9] font-arial-rounded">
            Reset password
          </Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  );
};

export default logIn;
