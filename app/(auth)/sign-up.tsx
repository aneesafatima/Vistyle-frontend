import React, { useContext } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router"; // Import useRouter from expo-router
import { useSignUpUserMutation } from "../../query/features/authApi"; // Import the mutation hook
import { GlobalContext } from "@/context/GlobalProvider";
// import * as SecureStore from "expo-secure-store"; //for production
import { saveToken } from "@/utils/storage";
const signUpSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: z.string(),
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
    defaultValues: { name: "", email: "", password: "", passwordConfirm: "" },
  });

  const [signUpUser, { isLoading }] = useSignUpUserMutation(); // RTK Query mutation hook
  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await signUpUser(data).unwrap(); // Call the mutation and unwrap the result
      //store the token
      await saveToken(result["token"]);
      setIsLoggedIn(true);
      setUserData({
        name: result["user"].name,
        email: result["user"].email,
      });
      router.replace("/(user)/home");
    } catch (error: any) {
      Alert.alert("Error", error?.data?.message || "Something went wrong");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 justify-center px-6">
      <Text className="text-2xl font-bold text-center mb-4">Sign Up</Text>

      {/* Name Field */}
      <View className="mb-4">
        <Text className="text-lg text-gray-800">Name</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-4 mt-2 bg-white"
              placeholder="Enter your name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.name && (
          <Text className="mt-1 text-red-500">{errors.name.message}</Text>
        )}
      </View>

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

      {/* Confirm Password Field */}
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
          <Text className="mt-1 text-red-500">
            {errors.passwordConfirm.message}
          </Text>
        )}
      </View>

      {/* Submit Button */}
      <Pressable
        className="py-3 rounded-lg bg-black"
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading} // Disable the button while loading
      >
        <Text className="text-white text-center text-lg font-medium">
          {isLoading ? "Signing Up..." : "Sign Up"}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SignUp;
