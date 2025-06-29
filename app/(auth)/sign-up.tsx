import React, { useContext } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router"; // Import useRouter from expo-router
import { useSignUpUserMutation } from "../../query/features/authApi"; // Import the mutation hook
import { GlobalContext } from "@/context/GlobalProvider";
// import * as SecureStore from "expo-secure-store"; //for production
import Dimensions from "react-native";
import { saveToken } from "@/utils/storage";
const signUpSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
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
    <SafeAreaView className="flex-1 bg-[#fafafa] justify-center px-6 pt-10 h-">
      {/* Name Field */}
      <View className="mb-4">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 text-[#222831] rounded-2xl px-4 py-4 "
              placeholder="Enter your name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor={"#3f454f"}
            />
          )}
        />
        {errors.name && (
          <Text className="mt-1 text-red-500">{errors.name.message}</Text>
        )}
      </View>

      {/* Email Field */}
      <View className="mb-4">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 text-[#222831] rounded-2xl px-4 py-4 mt-2"
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
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your password"
              placeholderTextColor={"#3f454f"}
            />
          )}
        />
        {errors.password && (
          <Text className="mt-1 text-red-500">{errors.password.message}</Text>
        )}
      </View>

      {/* Confirm Password Field */}
      <View className="mb-4">
        <Controller
          control={control}
          name="passwordConfirm"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 text-[#222831] rounded-2xl px-4 py-4 mt-2 "
              placeholder="Confirm your password"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor={"#3f454f"}
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
